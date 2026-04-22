package Recommandation

import (
	"net/http"
)

type UsageHistory struct {
	LastUpdateOn string `json:"LastUpdatedOn"`
}
type ProductData struct {
	ProductName     string         `json:"productName" `
	ProductQuantity int            `json:"productQuantity"`
	CreatedAt       string         `json:"createdAt"`
	ExpiryDate      string         `json:"expiryDate"`
	Use             []UsageHistory `json:"history"`
}

var Product []ProductData

const serverport = 3000

func main() {
	mux := http.NewServeMux()

}
