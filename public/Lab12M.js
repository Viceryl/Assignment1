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
    for (let i in products) {
        formHTML += `<h3>${products[i]["brand"]} at \$${products[i]["price"]} (${products[i]["total_sold"]}sold)</h3>;`;
        formHTML += `
        <label for="quantity_textbox_${i}">Quantity desired:</label>
        <input type="text" id="quantity_textbox_${i}" name="quantity_textbox[${i}]"
        onkeyup="checkQuantityTextbox(this);">
        <span id="quantity_textbox[${i}]_message">Enter a quantity</span><br>
        `;
    
    }
    
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
        