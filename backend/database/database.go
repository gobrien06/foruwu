package database

import (
    "fmt"
    "os"
	"github.com/jackc/pgx/v4"
    "context"
)

var conn *pgx.Conn
var err error

func GetConn() (*pgx.Conn) {
    if conn == nil || err != nil {
        conn, err = pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
        if err != nil {
            fmt.Println(err)
        }
    }
    return conn
}
