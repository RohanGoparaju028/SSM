package Recommandation

import (
	"encoding/json"
	"net/http"
)

type UsageHisty struct {
	LastUpdateOn string `json:"LastUpdatedOn"`
}
type ProductData struct {
	ProductName     string       `json:"productName" `
	ProductQuantity int          `json:"productQuantity"`
	CreatedAt       string       `json:"createdAt"`
	ExpiryDate      string       `json:"expiryDate"`
	Use             []UsageHisty `json:"history"`
}

var Product []ProductData

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/Get-Data", Data)

	http.ListenAndServe(":8080", mux)
}
func Data(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "You are not aurthorize to use this operation", 405)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&Product)
	if err != nil {
		http.Error(w, "Failed to parse the json file", 405)
		return
	}

}
