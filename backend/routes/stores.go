package routes

import (
    "fmt"
    "net/http"
    "encoding/json"
    "ForUwU/main/auth"
    "ForUwU/main/models"
)


func getItems() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.URL.Query().Get("id")
        payload, err := models.GetItems(id)
        if err != nil {
            fmt.Println(err)
            return
        }
        
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(payload)
    })
}

func getStores() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        payload, err := models.GetStores()
        if err != nil {
            fmt.Println(err)
            return
        }
        
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(payload)
    })

}

func addItem() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.Header.Get("id")
        var item models.Item
        err := json.NewDecoder(r.Body).Decode(&item)
        if err != nil {
            fmt.Println(err)
            return
        }
        models.AddItem(id, item)
        
        w.WriteHeader(http.StatusOK)
    })
}

func deleteItem() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        var data map[string]interface{}
        json.NewDecoder(r.Body).Decode(&data)
        fmt.Println(data)
        itemCode, _ := data["itemId"].(string)
        enterpriseId, _ := data["id"].(string)
        models.DeleteItem(enterpriseId, itemCode)
    })
}

func RouteStores() {
    var prefix string = "/stores"
    Auth := auth.Auth
    Cors := auth.Cors

    http.Handle(prefix, Cors(Auth(getStores())))
    http.Handle(prefix + "/addItem", Cors(Auth(addItem())))
    http.Handle(prefix + "/deleteItem", Cors(Auth(deleteItem())))
    http.Handle(prefix + "/getItems", Cors(Auth(getItems())))
}
