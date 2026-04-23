package Recommandation

import (
	"encoding/json"
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

var Product map[string][]ProductData

const serverport = 3000

func main() {
	var currentUsage []ProductData
	columns := []string{"ProductName", "ProductQuantity", "CreatedAt", "ExpiryDate", "Use"}
	mux := http.NewServeMux()
	mux.HandleFunc("/Get_Information", func(w http.ResponseWriter, r *http.Request) {
		resp, err := http.Get("")
		if err != nil {
			http.Error(w, "Cannot get the data at this moment please try again later", 500)
			return
		}
		defer resp.Body.Close()
		if err := json.NewDecoder(resp.Body).Decode(&currentUsage); err != nil {
			http.Error(w, "Failed to djsonify the request", 500)
			return
		}
		for idx, value := range columns {
			Product[value] = append(Product[value], currentUsage[idx])
		}
	})

	http.ListenAndServe(":8080", mux)
}
