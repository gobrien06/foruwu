package models

import (
    "fmt"
    "os"
    "context"
    "time"
    "net/http"
    "encoding/json"
    "errors"
    "bytes"
    "io/ioutil"
    "strings"
    "github.com/google/uuid"
    "ForUwU/main/database"
)

type Item struct {
    Name string `json:"name"`
    Price float64 `json:"price"`  
    ItemCode string `json:"itemCode"`
}

type ItemJSON struct {
    Items []Item `json:"items"`
}

type Store struct {
    Id string `json:"id"`
    Name string `json:"name"`
    Location string `json:"location"`
}

type StoresJSON struct {
    Stores []Store `json:"stores"`
}

type Coordinates struct {
    Latitude float64 `json:"latitude"`
    Longitude float64 `json:"longitude"`
}

type StoreSite struct {
    Sitename string `json:"siteName"`
    Unit string `json:"enterpriseUnitName"`
    Status string `json:"status"`
    Coord Coordinates `json:"coordinates"`
    Id string `json:referenceId"`
}

var queryStoreAvail string = "SELECT enterpriseId FROM accounts WHERE id=$1"
var queryStores string = "SELECT enterpriseId, name, location FROM accounts where NOT enterpriseId=''"
var queryRegisterStore string = "UPDATE accounts SET enterpriseId=$1 WHERE id=$2"

func registerStore(id string) (string, error) {
    url := "https://gateway-staging.ncrcloud.com/site/sites"
    payload, err := json.Marshal(StoreSite{"ForUwU-" + id, "ForUwU-" + id, "ACTIVE", Coordinates{0.0, 0.0}, "ForUwU-" + id})
    if err != nil {
        return "", err
    }
    
    client := &http.Client {
    
    }
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))

    if err != nil {
        return "", err
    }
    
    user := os.Getenv("USER_NAME")
    pass := os.Getenv("PASS")
    
    req.Header.Add("Content-Type", "application/json")
    req.SetBasicAuth(user, pass)
    req.Header.Add("nep-organization", os.Getenv("BSP_ORG"))
    req.Header.Add("Date", time.Now().Format("2006-01-02 15:04:05 GMT-07"))
    
    res, err := client.Do(req)
    if err != nil {
        return "", err
    }
    
    defer res.Body.Close()
    
    body, err := ioutil.ReadAll(res.Body)
    
    if err != nil {
        return "", err
    }
    
    data := make(map[string]interface{})
    err = json.Unmarshal(body, &data)
    if err != nil {
        return "", err
    }
    enterpriseId, ok := data["id"].(string);
    if !ok {
        return "", errors.New("no enterprise id")
    }
    
    conn := database.GetConn()
    _, err = conn.Exec(context.Background(), queryRegisterStore, enterpriseId, id)
    if err != nil {
        return "", err
    }
    return enterpriseId, nil
}

func createCategory(enterpriseId string) {
    
    url :=  "https://gateway-staging.ncrcloud.com/catalog/items/category-nodes/2/"
    millis := time.Now().UnixNano() / int64(time.Millisecond)
    payload := strings.NewReader(`{
        "nodes": [
            {
                "version": ` + fmt.Sprintf("%d", millis) + `,
                "nodeCode": "Items",
                "status": "ACTIVE",
                "title": {
                    "values": [{
                        "locale": "en-US",
                        "value": "location"
                    }]
                },
                "nodeId": {
                    "nodeId": "Items"
                }
            }
        ]
    }`)
    
    client := &http.Client {
    
    }
    req, err := http.NewRequest("PUT", url, payload)

    if err != nil {
        fmt.Println(err)
    }
    
    user := os.Getenv("USER_NAME")
    pass := os.Getenv("PASS")
    
    req.Header.Add("Content-Type", "application/json")
    req.SetBasicAuth(user, pass)
    req.Header.Add("nep-organization", os.Getenv("BSP_ORG"))
    req.Header.Add("Date", time.Now().Format("2006-01-02 15:04:05 GMT-07"))
    req.Header.Add("nep-enterprise-unit", enterpriseId)
    

    res, err := client.Do(req)
    defer res.Body.Close()
    body, err := ioutil.ReadAll(res.Body)
    fmt.Println(string(body))
}

func GetItems(enterpriseId string) (ItemJSON, error) {
    url := "https://gateway-staging.ncrcloud.com/catalog/2/item-details/2/"

    client := &http.Client {
    }
    
    req, err := http.NewRequest("GET", url, nil)

    if err != nil {
        return ItemJSON{}, err
    }
    
    user := os.Getenv("USER_NAME")
    pass := os.Getenv("PASS")
    
    req.SetBasicAuth(user, pass)
    req.Header.Add("nep-organization", os.Getenv("BSP_ORG"))
    req.Header.Add("nep-enterprise-unit", enterpriseId)

    res, err := client.Do(req)
    if err != nil {
        return ItemJSON{}, err
    }
    body, err := ioutil.ReadAll(res.Body)
    
    if err != nil {
        return ItemJSON{}, err
    }
    
    var data map[string]interface{}

    err = json.Unmarshal(body, &data)
    if err != nil {
        return ItemJSON{}, err
    }
    
    res.Body.Close()
    
    pageContent, ok := data["pageContent"]
    if !ok {
        return ItemJSON{}, nil
    }
    
    var items []Item
    
    for _, v := range pageContent.([]interface{}) {
        data, _ = v.(map[string]interface{})
        
        m, _ := data["itemPrices"]
        itemPrices, _ := m.([]interface{})
        itemPrice, _ := (itemPrices[0]).(map[string]interface{})
        m, _ = data["shortDescription"]
        shortDescription, _ := m.(map[string]interface{})
        m, _ = shortDescription["values"]
        values, _ := m.([]interface{})
        value, _ := (values[0]).(map[string]interface{})
        m, _ = data["itemId"]
        itemIdMap, _ := m.(map[string]interface{})
        
        
        price, _ := itemPrice["price"]
        name, _ := value["value"]
        itemId, _ := itemIdMap["itemCode"]
        
        item := Item{Name: name.(string), Price: price.(float64), ItemCode: itemId.(string)}
        items = append(items, item)
    }
    return ItemJSON{items}, nil
    
}

func GetStores() (StoresJSON, error) {
    conn := database.GetConn()
    
    rows, err := conn.Query(context.Background(), queryStores)
    if err != nil {
        return StoresJSON{}, err
    }
    var stores []Store
    
    var enterpriseId string
    var name string
    var location string
    for rows.Next() {
        err := rows.Scan(&enterpriseId, &name, &location)
        if err != nil {
            return StoresJSON{}, err
        }
        
        stores = append(stores, Store{Id: enterpriseId, Name: name, Location: location})
    }
    
    return StoresJSON{stores}, nil
}

func AddItem(id string, item Item) {
    conn := database.GetConn()
    
    var enterpriseId string
    
    err := conn.QueryRow(context.Background(), queryStoreAvail, id).Scan(&enterpriseId)
    if err != nil {
        fmt.Println(err)
        return
    }
    if len(enterpriseId) == 0 {
        enterpriseId, err = registerStore(id)
        if err != nil {
            fmt.Println(err)
            return
        }
        createCategory(enterpriseId)
    }
    
    
    
    millis := time.Now().UnixNano() / int64(time.Millisecond)
    
    itemCode := uuid.New().String()
    
    url := "https://gateway-staging.ncrcloud.com/catalog/2/items/2/" + itemCode

    payload := strings.NewReader(`{
        "version": ` + fmt.Sprintf("%d", millis) + `,
        "departmentId": "1",
        "status": "ACTIVE",
        "shortDescription": {
            "values": [
                {
                    "locale": "en-us",
                    "value": "` + item.Name + `"
                }
            ]
        },
        "merchandiseCategory": {
            "nodeId": "Items"
        },
        "nonMerchandise": false
    }`)

    client := &http.Client {
    }
    
    req, err := http.NewRequest("PUT", url, payload)

    if err != nil {
        fmt.Println(err)
    }
    
    user := os.Getenv("USER_NAME")
    pass := os.Getenv("PASS")
    
    req.Header.Add("Content-Type", "application/json")
    req.SetBasicAuth(user, pass)
    req.Header.Add("nep-organization", os.Getenv("BSP_ORG"))
    req.Header.Add("Date", time.Now().Format("2006-01-02 15:04:05 GMT-07"))
    req.Header.Add("nep-enterprise-unit", enterpriseId)

    res, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return 
    }
    body, err := ioutil.ReadAll(res.Body)
    
    if err != nil {
        fmt.Println(err)
        return 
    }
    
    fmt.Println(string(body))
    
    res.Body.Close()
    
    date := time.Now().Format("2006-01-02 15:04:05 GMT-07")
    isoDate := time.Now().UTC().Format("2006-01-02T15:04:05-0700")
    fmt.Println("second")
    url = "https://gateway-staging.ncrcloud.com/catalog/2/item-prices/2/" + itemCode + "/" + uuid.New().String()
    
    payload = strings.NewReader(`{
        "version": ` + fmt.Sprintf("%d", millis) + `,
        "price": ` + fmt.Sprintf("%.2f", item.Price) + `,
        "currency": "US Dollar",
        "effectiveDate": "` + isoDate + `",
        "status": "ACTIVE"
    }`)
    req, err = http.NewRequest("PUT", url, payload)

    if err != nil {
        fmt.Println(err)
    }
     
    req.Header.Add("Content-Type", "application/json")
    req.SetBasicAuth(user, pass)
    req.Header.Add("nep-organization", os.Getenv("BSP_ORG"))
    req.Header.Add("Date", date)
    req.Header.Add("nep-enterprise-unit", enterpriseId)
    
    
    res, err = client.Do(req)
    if err != nil {
        fmt.Println(err)
        return 
    }
    body, err = ioutil.ReadAll(res.Body)
    
    if err != nil {
        fmt.Println(err)
        return 
    }
    
    fmt.Println(string(body))
    
    res.Body.Close()
    
}

func DeleteItem(enterpriseId string, itemCode string) {
     
    millis := time.Now().UnixNano() / int64(time.Millisecond)
    
    url := "https://gateway-staging.ncrcloud.com/catalog/2/items/2/" + itemCode

    payload := strings.NewReader(`{
        "version": ` + fmt.Sprintf("%d", millis) + `,
        "departmentId": "1",
        "status": "INACTIVE",
        "shortDescription": {
            "values": [
                {
                    "locale": "en-us",
                    "value": "N/A"
                }
            ]
        },
        "merchandiseCategory": {
            "nodeId": "Items"
        },
        "nonMerchandise": false
    }`)

    client := &http.Client {
    }
    
    req, err := http.NewRequest("PUT", url, payload)

    if err != nil {
        fmt.Println(err)
    }
    
    user := os.Getenv("USER_NAME")
    pass := os.Getenv("PASS")
    
    req.Header.Add("Content-Type", "application/json")
    req.SetBasicAuth(user, pass)
    req.Header.Add("nep-organization", os.Getenv("BSP_ORG"))
    req.Header.Add("Date", time.Now().Format("2006-01-02 15:04:05 GMT-07"))
    req.Header.Add("nep-enterprise-unit", enterpriseId)

    res, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return 
    }
    body, err := ioutil.ReadAll(res.Body)
    
    if err != nil {
        fmt.Println(err)
        return 
    }
    
    fmt.Println(string(body))
    
    res.Body.Close()
    
}