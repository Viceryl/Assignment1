// Get the URL
let params = (new URL(document.location)).searchParams;

// On load, if there is no 'valid' key, redirect the user back to the Home page
window.onload = function() {
    if (!params.has('valid')) {
        document.write(`
            <head>
                <link rel="stylesheet" href="syle.css">
            </head>
            <body style="text-align: center; margin-top: 10%;">
                <h2>ERROR: No form submission detected.</h2>
                <h4>Return to <a href="index.html">Home</a></h4> 
            </body>
        `)
    }
}

//
window.onload= function(){
    console.log
}
//

let subtotal = 0;

let qty = [];
for (let i in products) {
    qty.push(params.get(`qty${i}`));
}

for (let i in qty) {
    if (qty[i] == 0 || qty[i] == '') continue;

    extended_price = (params.get(`qty${i}`) * products[i].price).toFixed(2);
    subtotal += Number(extended_price);

    document.querySelector('#invoiceTable').innerHTML += `
        <tr style="border: none;">
        <td width="10%">
        <div class="icon-container">
        <div class="icon" id="${products[i].name}-icon" onmouseover="showPopup(this)" onmouseout="hidePopup(this)" >
        <img src="${products[i].image}" alt="${products[i].alt}" style="border-radius: 5px;" title="Meet ${products[i].name}, the ${products[i].details} :)" >
        </div>

        <div class="popup" id="${products[i].name}-icon-popup" style="display: none;">      
        ${products[i].details}
        </div>
        </div>

      </td>
            <td>${products[i].name}</td>
            <td>${qty[i]}</td>
            <td>${products[i].qty_available}</td>
            <td>$${products[i].price.toFixed(2)}</td>
            <td>$${extended_price}</td>
        </tr>
    `;
}
 

/*   <div class="icon-container">
          </div>

*/
function showPopup(element) {
    let idd=element.id
    let popup = document.getElementById(`${idd}-popup`);
   popup.style.display = "block";
  }
  
  function hidePopup(element) {
    let idd=element.id
    let popup = document.getElementById(`${idd}-popup`);
    popup.style.display = "none";
  }
  

// Sales tax
let tax_rate = (4.7/100);
let tax_amt = subtotal * tax_rate;

// Shipping
if (subtotal < 300) {
    shipping = 5;
    shipping_display = `$${shipping.toFixed(2)}`;
    total = Number(tax_amt + subtotal + shipping);
}
else if (subtotal >= 300 && subtotal < 500) {
    shipping = 10;
    shipping_display = `$${shipping.toFixed(2)}`;
    total = Number(tax_amt + subtotal + shipping);
}
else {
    shipping = 0;
    shipping_display = 'FREE';
    total = Number(tax_amt + subtotal + shipping);
}

document.querySelector('#table_bottom').innerHTML += `
    <tr style="border-top: 2px solid black;">
        <td colspan="5" style="text-align:center;">Sub-total</td>
        <td>$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
        <td colspan="5" style="text-align:center;">Tax @ ${Number(tax_rate) * 100}%</td>
        <td>$${tax_amt.toFixed(2)}</td>
    </tr>
    <tr>
        <td colspan="5" style="text-align:center;">Shipping</td>
        <td>${shipping_display}</td>
    </tr>
    <tr>
        <td colspan="5" style="text-align:center;"><b>Total</td>
        <td><b>$${total.toFixed(2)}</td>
    </tr>
`;