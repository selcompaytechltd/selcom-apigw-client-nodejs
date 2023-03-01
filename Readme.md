
# Selcom API Gateway Client - NODEJS

<p align='center'>

<img src="https://img.shields.io/node/v/e">

</p >

## Homepage
https://developers.selcommobile.com/

## Description
This is a library containing functions that aid in the accessing of selcom api. IT is made up pf 4 functions.


## Installation

npm i selcom-apigw-client

## Usage
```js
//import package
const {apigwClient } = require("selcom-apigw-client");
// initalize a new apiAccess instace with values of the base url, api key and api secret

client = new apigwClient(baseUrl, apiKey, apiSecret);

// computeHeader a json containing data to bes submitted
// computeHeader returns an array with values for the following header fields: 
// Authorization, Timestamp, Digest, Signed-Fields
client.computeHeader( jsonData):

// postFuct takes relative path to base url. json containing data to be submitted 
// It performs a POST request of the submitted data to the destniation url generatingg the header internally
// IT returns a promise containing the response data to the request
client.postFunc(path, jsonData)

// getFuct takestakes relative path to base url. json containing data to be submitted  
// It performs a GET request adding the query to the  url and generatingg the header internally
// IT returns a promise containing the response data to the request
client.getFunc(path, jsonData)

// deletetFuct takes relative path to base url.json containing data to be submitted 
// It performs a DELETE request adding the query to the  url and generatingg the header internally
// IT returns a promise containing the response data to the request
client.deleteFunc(path, jsonData)
```
### Examples
```js
//import package
const {apigwClient } = require("selcom-apigw-client");
// initalize a new apiAccess instace with values of the base url, api key and api secret

const apiKey = '202cb962ac59075b964b07152d234b70';
const apiSecret = '81dc9bdb52d04dc20036dbd8313ed055';
const baseUrl = "http://example.com"

// initalize a new apiAccess instace with values of the base url, api key and api secret
const client = new apiAccess(baseUrl, apiKey, apiSecret);

//order data
var orderJson = {
"vendor":"VENDORTILL",
"order_id":"1218d5Qb",
"buyer_email": "john@example.com",
"buyer_name": "John Joh",
"buyer_phone": "255682555555",
"amount":  8000,
"currency":"TZS",
"buyer_remarks":"None",
"merchant_remarks":"None",
"no_of_items":  1

}
// path relatiive to base url
var orderPath = "/v1/checkout/create-order-minimal"
//crate new order

var = orderRespose = client.postFunc(orderPath, orderJson)

//get response data from promise
orderResponse.then((response)=> {console.log(response)}).catch((response)=> {console.log(response)})
```
