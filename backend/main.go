package main

import (
    //"fmt"
    "net/http"
    "ForUwU/main/routes"
    "github.com/joho/godotenv"
)



func main() {
    godotenv.Load()
    routes.RouteStores()
    routes.RouteUsers()
    
    http.ListenAndServe(":80", nil)
}