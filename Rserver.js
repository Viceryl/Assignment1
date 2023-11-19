


const express = require('express');
const app = express();

//
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const qs = require('qs');
app.use(express.static(__dirname + '/public'));
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});
//

const products = require(__dirname + '/products.json');

app.get('/products.js', function (request, response, next) {
    response.type('.js');
    const products_str = `let products = ${JSON.stringify(products)};`;
    response.send(products_str);
});

//Chatgpt
/*
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const qs = require('qs');
app.use(express.static(__dirname + '/public'));
*/


app.post("/quantity_check", (req, res) => {
    const inputValue = req.body.input;
    console.log(`Received input from client: ${inputValue}`);

}        
)


app.post("/process_purchase", function(request, response){

let POST=request.body;
let hasqty = false;
let errorObject=[];


for (let i in products){
    let qty=POST[`qty${i}`];
    hasqty = hasqty||(qty>0);
    let errormessage = Validateinput(qty, products[i].qty_available)
    
    if (errormessage.length>0){
    errorObject.push(errormessage)

    console.log(errormessage + "1")}
}


if (hasqty== true && Object.keys(errorObject).length == 0){
    for (let i in products){
        let qty=POST[`qty${[i]}`];

        products[i].qty_sold+=Number(qty)


        products[i].qty_available=products[i].qty_available - qty;


    }
    response.redirect("/invoice.html?valid&" + qs.stringify(POST))
} 
else {response.redirect("./RPD.html?" + qs.stringify(POST));
}

}
)

app.addListener


app.listen(8080, () => console.log('Listening on port 8080'));

function Validateinput(quantity){
    quantity=Number(quantity)
    if (isNaN(quantity)) {
        return "Not a number";
      } else if (quantity < 0 && !Number.isInteger(quantity)) {
        return "Negative non-integer inventory";
      } else if (quantity < 0) {
        return "Negative inventory";
      } else if (!Number.isInteger(quantity)) {
        return "Non-integer";
      } else {
        return ""; // no errors
      };
    }
