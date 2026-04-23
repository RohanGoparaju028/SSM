package Recommandation

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
)

type UsageHistory struct {
	LastUpdatedOn string `json:"lastUpdatedOn"`
}

type ProductData struct {
	ProductName     string         `json:"productName"`
	ProductQuantity int            `json:"productQuantity"`
	CreatedAt       string         `json:"createdAt"`
	ExpiryDate      string         `json:"expiryDate"`
	Use             []UsageHistory `json:"history"`
}

var Product map[string][]interface{}

const serverport = 3000

func main() {
	Product = make(map[string][]interface{})
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
			http.Error(w, "Failed to decode JSON from backend", 500)
			return
		}

		// Dynamic Column Mapping using Reflection
		for _, p := range currentUsage {
			v := reflect.ValueOf(p)
			for _, col := range columns {
				field := v.FieldByName(col)
				if field.IsValid() {
					Product[col] = append(Product[col], field.Interface())
				}
			}
		}

		fmt.Fprintf(w, "Successfully synced %d products into ML columns", len(currentUsage))
	})

	fmt.Printf("Go server starting on :8080 (talking to NestJS on :%d)...\n", serverport)
	http.ListenAndServe(":8080", mux)
}
