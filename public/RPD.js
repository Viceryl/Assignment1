
//JUST LOOP to populate

for (let i = 0; i < products.length; i++) {
    //console.log(i)
    document.querySelector('.row').innerHTML += `
                                        <!-- Product Card Section-->
        <div class="col-md-6 product_card" style="margin-bottom: 40px; padding: 15px;">
        
            <div>                             <!--Product Title card (Name and Price)-->
                <h5 style="float: left;" class="product_name">${products[i].name}</h5>
                <h5 style="float: right;">$${(products[i].price).toFixed(2)}</h5>
            </div>  

                                     <!-- Product image Section-->
            <img src="${products[i].image}" class="img-thumbnail" alt="${products[i].alt}">

                                     <!-- Product Detail DIV Section (Stock and order bar) -->
            <div style="height: 90px;">
                                     <!-- Table for formating -->
                <table style="width: 100%; text-align: center; font-size: 18px;" id="product_table">
                    <tr>
                    <!-- Table data (Amount Available) -->
                        <td style="text-align: left; width: 35%;">Available: ${products[i].qty_available}</td>
                    <!-- Table data (Column2 Area) -->
                        <td style="text-align: center; width: 35%;" rowspan="2">

                        <!-- Cool Rounded "DIV" section (Order Bar Elements)-->
                        <div style="border-radius: 50px; border: 2px solid black; width: 70%; height: 40px; float: right;" id="qty${[i]}Round">
                           
                        <!-- Subtract button -->
                            <button type="button" style="float: left;" class="qtyButton highlight" onclick="document.getElementById('qty${[i]}_entered').value--; checkInputTextbox(qty${[i]}_entered);">--</button>

                            <!-- Quantity input box -->
                            <input type="text" style="width:50%;" autocomplete="off" placeholder="0" name="qty${[i]}" id="qty${[i]}_entered" class="inputBox" onkeyup="checkInputTextbox(this); sendToServer(qty${[i]}_entered)">

                            <!-- Add button -->
                            <button type="button" style="float:right;" class="qtyButton highlight" onclick="document.getElementById('qty${[i]}_entered').value++; checkInputTextbox(qty${[i]}_entered); sendToServer(qty${[i]}_entered)">+</button>

                         </div>

                         <!-- Label for orderbar -->
                            <label id="qty${[i]}_label" style="margin: 6px 0; float: right; padding-right: 10px;">Qty:</label>
                        </td>
                    </tr>

                    <!-- Table 2nd Row -->
                    <tr>                       <!-- Amount Sold -->
                        <td style="text-align: left; width: 35%;" id="qty_sold${i}">Sold: ${products[i].qty_sold}</td>
                    </tr>

                    <!-- Table 3rd Row -->
                    <tr>                        <!-- box for error message -->
                        <td colspan="3" style="padding-top: 5px;"><div id="qty${[i]}_error" style="color: red;"></div></td>
                    </tr>
                </table>
            </div>  
        </div>
    `;
}


    function sendToServer(Data) {
        console.log("a")

        // Get the input value
        let inputValue = Data.value;
        console.log(inputValue)
        // Use Fetch API to send a POST request
        fetch("/quantity_check", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputValue }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


function checkInputTextbox(Data){
    let Error= Validateinput( (Data.value));
    document.getElementById(Data.name+`_error`).innerHTML=Error

    let overStock= ValidateStock(Data)
    //console.log(overStock)
    if(overStock!=" "){
document.getElementById(Data.name+`_error`).innerHTML=overStock
Data.value=Number(products[Number(Data.name.slice(3))].qty_available)
    }

    if(document.getElementById(Data.name+`_error`).innerHTML!==" "){
        document.getElementById(Data.name+`Round`).style.border="2px solid red"
    } else {
        document.getElementById(Data.name+`Round`).style.border="2px solid black"

    }
}



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
        return " "; // no errors
      };
}



function ValidateStock(quantity){
    let order=quantity.value
    let stock=Number(products[Number(quantity.name.slice(3))].qty_available)

if(order>stock){
return "Purchase Limit";
} else { return " "}
}



// Validation of inputr



//windows onload Validation
let params = (new URL(document.location)).searchParams;
window.onload = function() {
  //  console.log(params+"params")
console.log(params)
    let qty = [];
    for (let i in products) {
        qty.push(params.get(`qty${i}`));
        console.log(params.get(`qty${i}`))
}
console.log(qty)

if (qty.some(q => q !== null)) {
    if (qty.every(q => q == 0)){
        document.getElementById("errMsg").innerHTML="Select a purchase quantity"
    } 
    else{
        if (qty.some(q => q !== 0)){
        document.getElementById("errMsg").innerHTML="Invalid Purchase: Purchase quantity must be a positive interger"
        }
    }
}


//else {document.getElementById("errMsg").innerHTML="Please select a purchase quantity"


for ([i] in qty){
    text_Value=Number(qty[i])
    textbox=document.getElementById(`qty${[i]}_entered`)
textbox.value=text_Value;
checkInputTextbox(textbox)
}


}

//input box onchange

// GET CLient

//in invoicejs
// use black magic to capture url parameters