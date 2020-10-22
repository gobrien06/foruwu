package models

import (
    "fmt"
   // "os"
    "context"
    "ForUwU/main/auth"
    "ForUwU/main/database"
    "golang.org/x/crypto/bcrypt"
)

type Credential struct {
    Email string `json:"email"`
    Password string `json:"password"`
}

type Account struct {
    Name string `json:"name"`
    Location string `json:"location"`
    Cred Credential `json:cred"`
}

type UserInfo struct {
    Name string `json:"name"`
    Location string `json:"location"`
    Email string `json:"email"`
    Id string `json:"id"`
}

var queryRegister string = "INSERT INTO accounts (name, location, email, password) VALUES ($1, $2, $3, $4) RETURNING id"
var queryLogin string = "SELECT id, password FROM accounts WHERE email=$1"
var queryPersonal string = "SELECT name, location, email, enterpriseId FROM accounts WHERE id=$1"

func Register(account Account) (string, error) {
    hash, err := bcrypt.GenerateFromPassword([]byte(account.Cred.Password), 10)
    if err != nil {
        return "", fmt.Errorf("Couldn't hash")
    }
    account.Cred.Password = string(hash)
    
    conn := database.GetConn()
    id := ""
    err = conn.QueryRow(context.Background(), queryRegister, account.Name, account.Location, account.Cred.Email, account.Cred.Password).Scan(&id)
    if err != nil {
        return "", err
    }
    
    return auth.CreateToken(id), nil
}

func Login(cred Credential) (string, error) {
    conn := database.GetConn()
    var id string
    var hash string
    err := conn.QueryRow(context.Background(), queryLogin, cred.Email).Scan(&id, &hash)
    if err != nil {
        return "", err
    }
    
    err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(cred.Password))
    if err != nil {
        return "", err
    }
    
    return auth.CreateToken(id), nil
}

func UserPersonal(id string) (UserInfo, error) {
    conn := database.GetConn()
    var name string
    var location string
    var email string
    var enterpriseId string
    err := conn.QueryRow(context.Background(), queryPersonal, id).Scan(&name, &location, &email, &enterpriseId)
    if err != nil {
        return UserInfo{}, err
    }
    return UserInfo{name, location, email, enterpriseId}, nil
    
}