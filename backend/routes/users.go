package routes

import (
    "fmt"
    "net/http"
    "encoding/json"
    "ForUwU/main/models"
    "ForUwU/main/auth"
)

type TokenResponse struct {
    Id string `json:"id"`
}

func registerUser() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        var account models.Account
        err := json.NewDecoder(r.Body).Decode(&account)
        if err != nil {
            fmt.Println(err)
            return
        }
        tokenString, err := models.Register(account)
        if err != nil {
            fmt.Println(err)
            return
        }
        
        fmt.Println(tokenString)
        
        payload := TokenResponse{tokenString}
            
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(payload)
    })
}

func login() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        var cred models.Credential
        err := json.NewDecoder(r.Body).Decode(&cred)
        if err != nil {
            fmt.Println(err)
            return
        }
        tokenString, err := models.Login(cred)
        if err != nil {
            fmt.Println(err)
            return
        }
        
        payload := TokenResponse{tokenString}
        
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(payload)
    })
}

func personal() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        payload, err := models.UserPersonal(r.Header.Get("id"))
        if err != nil {
            fmt.Println(err)
            return
        }
        
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(payload)
    })
}

func RouteUsers() {
    var prefix string = "/users/"
    
    http.Handle(prefix + "register", auth.Cors(registerUser()))
    http.Handle(prefix + "login", auth.Cors(login()))
    http.Handle(prefix + "personal", auth.Cors(auth.Auth(personal())))
}
