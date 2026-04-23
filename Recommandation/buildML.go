package Recommandation

import (
	"github.com/cdipaolo/goml"
	"os"
)

func loadIntoColumn(columnName string) (map[string]interface{}, map[string]interface{}) {
	X := make(map[string]interface{})
	y := make(map[string]interface{})
	y[columnName] = Product[columnName]
	for name, _ := range Product {
		if name == columnName {
			continue
		}
		X[name] = Product[name]
	}
	return X, y
}
func train_test_split(X,y map[string]interface{},testSize float64) (map[string]interface{},map[string]interface{},map[string]interface{},map[string]interface{}){
	if len(X) != len(y) {
		os.Exit("The target and independnet varible must be of same size")
	}
	train_length := int(testSize* float64(len(X)))
	X_train := X[:train_length]
	y_train := y[:train_length]
	X_test := X[train_length:]
	y_test := y[:train]
	return X_train,X_test,y_train,y_test
}
func PredictQuantity() {
	X,y := loadIntoColumn("ProductQuantity")
	X_train,X_test,y_Train,y_test := 
}
func PredictExpiry() {

}
