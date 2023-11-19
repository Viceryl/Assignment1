/*
// Importing the Express.js framework 
const express = require('express');
// Create an instance of the Express application called "app"
// app will be used to define routes, handle requests, etc
const app = express();

// Monitor all requests regardless of their method (GET, POST, PUT, etc) and their path (URL)
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

/* Import data from a JSON file containing information about products
__dirname represents the directory of the current module (where server.js is located)
__dirname + "./products.json" specifies the location of products.json

const products = require(__dirname + "./products.json");

// Define a route for handling a GET request to a path that matches "./products.js"
app.get('./products.js', function(request, response, next) {
	// Send the response as JS
	response.type('.js');
	
	// Create a JS string (products_str) that contains data loaded from the products.json file
	// Convert the JS string into a JSON string and embed it within variable products
	const products_str = `let products = ${JSON.stringify(products)};`;
	
	// Send the string in response to the GET request
	response.send(products_str);
});

// Route all other GET requests to serve static files from a directory named "public"
app.use(express.static(__dirname + '/public'));

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`listening on port 8080`));
*/

let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/test', function (req,res){
    res.send('app .get for test was executed'); 
    console.log('app.get for test was executed');
});

const products = require(__dirname + '/products.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

app.get("/products.js", function (request, response, next) {
  response.type('.js');
  let products_str = `let products = ${JSON.stringify(products)};`;
  response.send(products_str);
}); 

app.use(express.urlencoded({ extended: true }));




app.post("/process_form", function (request, response) {
  let receipt = '';
  let qtys = request.body[`quantity_textbox`];
  console.log(qtys);
  for (i in qtys) {
      let q = Number(qtys[i]);
      console.log("the quantity value is" + q);
      let validationMessage = validateQuantity(q)
      let brand = products[i]['brand'];
      let brand_price = products[i]['price'];
      if (validateQuantity(q)===" ") {
          products[i]['total_sold'] += Number(q);
          receipt += `<h3>Thank you for purchasing: ${q} ${brand}. Your total is \$${q * brand_price}!</h3>`; // render template string
      } else {
          receipt += `<h3><font color="red">${q} is not a valid quantity for ${brand}!</font></h3>`;
          console.log(validationMessage)

      }
  }
  response.send(receipt);
  response.end();
 });

app.all('*', function (request, response, next) { 
    //response.send(request.method + ' to path ' + request.path);
    console.log(request.method + ' to path ' + request.path)
});
 


app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback

function validateQuantity(quantity) {
    if (isNaN(quantity)) {
      return "Not a number";
    } else if (quantity < 0 && !Number.isInteger(quantity)) {
      return "Negative non-integer inventory";
    } else if (quantity < 0) {
      return "Negative inventory";
    } else if (!Number.isInteger(quantity)) {
      return "Non-integer";
    } else {
      return " "; // no errors
    };
  }