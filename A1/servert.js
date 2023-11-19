// server.js

// Import necessary modules
const express = require('express');
const app = express();
const port = 8080;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON and URL-encoded data in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to get products from the 'products.json' file
app.get('/getProducts', (req, res) => {
    // Read products from 'products.json'
    const products = require('./products.json');
    // Send the products as JSON response
    res.json(products);
});

// Endpoint to handle form submission and complete the purchase
app.post('/completePurchase', (req, res) => {
    // Extract form data from the request body
    const formData = req.body;

    // Validate form data
    if (validateFormData(formData)) {
        // Redirect to invoice.html with form data as query parameters
        res.redirect(`/invoice.html?${new URLSearchParams(formData).toString()}`);
    } else {
        // Send a 400 Bad Request response for invalid form data
        res.status(400).send('Invalid form data');
    }
});

// Function to validate form data (customize as needed)
function validateFormData(formData) {
    // Example: Check if quantities are whole integers
    for (const key in formData) {
        if (key.startsWith('quantity')) {
            const quantity = parseInt(formData[key], 10);
            if (isNaN(quantity) || quantity < 0 || !Number.isInteger(quantity)) {
                return false;
            }
        }
    }
    return true;
}

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
