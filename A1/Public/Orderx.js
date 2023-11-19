document.addEventListener('DOMContentLoaded', function () {
    // Dynamically populate products on the page
    function renderProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        for (const product of products) {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-6 mb-4';

            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Available Quantity: ${product.AvailableQ}</p>
                        <form class="order-form">
                            <div class="form-group">
                                <label for="${product.name}-quantity">Quantity:</label>
                                <input type="text" class="form-control" id="${product.name}-quantity" onkeyup="validateInput(this)">
                            </div>
                            <button type="button" class="btn btn-primary" onclick="submitOrder('${product.name}', ${product.price}, ${product.AvailableQ})">Purchase</button>
                        </form>
                    </div>
                </div>
            `;

            productList.appendChild(productCard);
        }
    }

    // Function to validate input (accepts only positive integers)
    window.validateInput = function (input) {
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    // Function to submit order
    window.submitOrder = function (productName, productPrice, availableQuantity) {
        const quantityInput = document.getElementById(`${productName}-quantity`);
        const quantityOrdered = parseInt(quantityInput.value);

        // Validate quantity
        if (isNaN(quantityOrdered) || quantityOrdered <= 0 || quantityOrdered > availableQuantity) {
            alert('Please enter a valid quantity.');
            return;
        }

        // Reduce available quantity
        availableQuantity -= quantityOrdered;

        // TODO: Send order data to server (you can use fetch or another AJAX method)

        // For now, log the order to console
        console.log(`Order placed for ${quantityOrdered} ${productName}(s). Remaining quantity: ${availableQuantity}`);
    };

    // Load products on page load
    renderProducts();
});
