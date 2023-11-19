// OrderT.js

// Function to fetch products from the server
async function getProducts() {
    try {
        // Fetch products from the '/getProducts' endpoint
        const response = await fetch('/getProducts');
        // Parse the JSON response
        let products = await response.json();
        // Return the array of products
        return products;
    } catch (error) {
        // Handle errors during the fetch operation
        console.error('Error fetching products:', error);
        return [];
    }
}

function logproducts(){
    console.log(products)
}

// Function to render products on the page
function renderProducts(products) {
    // Get the container where products will be displayed
    const productContainer = document.getElementById('product-container');

    // Loop through each product and create a card for it
    products.forEach(product => {
        const productCard = `
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                        <p class="card-text">${product.AvailableQ} left in stock</p>
                        <div class="mb-3">
                            <label for="quantity${product.id}" class="form-label">Quantity:</label>
                            <input type="number" class="form-control" id="quantity${product.id}" name="quantity${product.id}" min="0" required onchange="checkQTextbox();">
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Append the product card to the container
        productContainer.innerHTML += productCard;
    });
}

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch products and render them when the page is loaded
    const products = await getProducts();
    renderProducts(products);
});

function checkQTextbox(){
console.log("bruh")
let textQ=document.getElementById("quantity${product.id}").innerHTML
return ValidationQ(textQ)
}



function ValidationQ(quantity) {

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
    return " "; // no errors
    }
    }




// Event listener for the purchase form submission
document.getElementById('purchaseForm').addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);

    // Send form data to the server
    try {
        // Make a POST request to the '/completePurchase' endpoint
        const response = await fetch('/completePurchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData),
        });

        // Check if the server response is OK
        if (response.ok) {
            // Redirect to the received URL (e.g., invoice.html)
            window.location.href = response.url;
        } else {
            console.error('Failed to complete purchase');
        }
    } catch (error) {
        // Handle errors during the fetch operation
        console.error('Error completing purchase:', error);
    }
});
