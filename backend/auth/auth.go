package auth

import (
    "fmt"
    "net/http"
    "strings"
    "github.com/dgrijalva/jwt-go"
)

var secret []byte = []byte("notasecretyet")

func CreateToken(id string) string {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "id": id,
    })
    tokenString, err := token.SignedString(secret)
    if err != nil {
        fmt.Println(err)
        return ""
    }
    return tokenString
}

func Cors(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,Authorization,X-CSRF-Token")
        next.ServeHTTP(w, r)
    })
}

func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        tokenString := r.Header.Get("Authorization")
        fmt.Println(tokenString)
        splitToken := strings.Split(tokenString, "Bearer ")
        if len(splitToken) != 2 {
            fmt.Println("Illegal bearer")
            return
        }
        tokenString = splitToken[1]
        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fmt.Errorf("Unexpected")
            }
            return secret, nil
        })
        if err != nil {
            //send back bad
            fmt.Println("Error checking token")
            return
        }
        
        claims, ok := token.Claims.(jwt.MapClaims)
        if !ok {
            // send back stuff
            return
        }
        r.Header.Set("id", claims["id"].(string))
        next.ServeHTTP(w, r);
    })
}