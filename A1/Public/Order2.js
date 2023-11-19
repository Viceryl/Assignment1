//orderMulti.js (LAB12,6)


window.onload = function () {

    ///Check URl for error parameters and diplay/use them
    let params=(new URL(document.location)).searchParams;
    let q =Number(params.get('quantity'));
    let error=params.get('error');
    
    //if there is an error alert the user
    if (error) {
        alert(error);
    }
    // define a variable that points to the form on the dom in ordder to dynamically populate the form
    const form =document.getElementById('productForm');
    let formHTML = ''; //blank content form
    
    // write a loop to print product information and create text inputbox for every element of product array
    products.forEach(product => {
        product=products[i]
        const productCard = `
        <div class="col-lg-4 mb-4">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}</p>
                    <div class="mb-3">
                        <label for="quantity${product.id}" class="form-label">Quantity:</label>
                        <input type="number" class="form-control" id="quantity${product.id}" name="quantity${product.id}" min="0" required>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Append the product card to the container
    document.getElementById(productContainer).innerHTML += productCard;
    })
    
    //ensure the submit buttom is part of form
    formHTML+=`<br> <input type="submit" value="purchase">`;
    //push form vontent to DOM
    form.innerHTML=formHTML
    
    }
    //add checkquantityfunction()
    function checkQuantityTextbox(theTextbox) {
       let errs = ValidationQ(theTextbox.value, true);
        document.getElementById(theTextbox.name + '_message').innerHTML = errs;
    }
    
    //add the validateQuantity() Function
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
        