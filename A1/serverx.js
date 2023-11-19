const express = require('express');
const app = express();

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

const products = require(__dirname + '/products.json');

app.get('/products.js', function (request, response, next) {
    response.type('.js');
    const products_str = `let products = ${JSON.stringify(products)};`;
    response.send(products_str);
});

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log('Listening on port 8080'));
