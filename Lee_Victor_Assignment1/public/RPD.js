
// Populate Store Front

const { log } = require("console");

//use loop to generate html with reference to product data 
document.querySelector('.row').innerHTML=" "

for (let i = 0; i < products.length; i++) {
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
                        <td id="qty_available${i}" class="qty_card";">Available: ${products[i].qty_available}</td>
                    <!-- Table data (Column2 Area) -->
                        <td style="text-align: center; width: 35%;" rowspan="2">
                        <span id="qty_available${i}>
                        <!-- Cool Rounded "DIV" section (Order Bar Elements)-->
                        <div style="border-radius: 50px; border: 2px solid black; width: 70%; height: 40px; float: right;" id="qty${[i]}Round">
                           
                        <!-- Subtract button -->
                            <button type="button" style="float: left;" class="qtyButton highlight" onclick="document.getElementById('qty${[i]}_entered').value--; checkInputTextbox(qty${[i]}_entered) ;checkserver();">-</button>

                            <!-- Quantity input box -->
                            <input type="text" style="width:50%;" autocomplete="off" placeholder="0" name="qty${[i]}" id="qty${[i]}_entered" class="inputBox" onkeyup="checkInputTextbox(this); checkserver()";>

                            <!-- Add button -->
                            <button type="button" style="float:right;" class="qtyButton highlight" onclick="document.getElementById('qty${[i]}_entered').value++; checkInputTextbox(qty${[i]}_entered); checkserver()";>+</button>

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

//Update Stock data dynamically from server on key up
function checkserver() {
    console.log("hi)")
   /* fetch('sold')
      .then(response => response.text()) // Use response.text() because the server sends plain JavaScript
      .then(data => {
                    //Assuming the server sends a JavaScript string as the response
        //[Redacted](data); // Evaluate the JavaScript string to define the 'products' variable
        let dataclean=data.slice(1,-1) 
        let Nsold=dataclean.split(",")

        for(i in products){
        document.getElementById(`qty_sold${i}`).innerHTML=`Sold: ${Nsold[i]}`;
          }
        })
      .catch(error => {
        console.error('Error:', error);
      });

      fetch('stock')
      .then(response => response.text()) // Use response.text() because the server sends plain JavaScript
      .then(data => {
        // Assuming the server sends a JavaScript string as the response
        eval(data); // Evaluate the JavaScript string to define the 'products' variable
        let dataclean=data.slice(1,-1)
        let Nstock=dataclean.split(",")

        for(i in products){
        document.getElementById(`qty_available${i}`).innerHTML=`Available: ${Nstock[i]}`;
        }
       
    })
      .catch(error => {
        console.error('Error:', error);
      });

  
  */
    }
//----------------------------------

// fuction to validate input and quantity data

function checkInputTextbox(Data){ //declare function, Data will be the input tag for the textbox in quextion
    let Error= Validateinput( (Data.value));// retrieve value of texbox(Data) and validate it in Validateinput-f
    document.getElementById(Data.name+`_error`).innerHTML=Error//Apply output to HTMLDOM

    let overStock= ValidateStock(Data)//// retrieve value of texbox(Data) and check stock using validatestock-f
    if(overStock!=" "){//condition: error occurs
    document.getElementById(Data.name+`_error`).innerHTML=overStock///Apply output to HTMLDOM
    Data.value=Number(products[Number(Data.name.slice(3))].qty_available)//replace value of textbox with qty available
    }
//Restyle errored boxes
    if(document.getElementById(Data.name+`_error`).innerHTML!==" "){
        document.getElementById(Data.name+`Round`).style.border="2px solid red"
    } else {
        document.getElementById(Data.name+`Round`).style.border="2px solid black"

    }
}


//Validates for possitive intergers
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


//Compares textbox value to quantity available
function ValidateStock(quantity){
    let order=quantity.value
    let stock=Number(products[Number(quantity.name.slice(3))].qty_available)

//if order exceeds auantity available returnsa an error otherwise return empty
    if(order>stock){
    return "Purchase Limit";}
    else { return " "}
}

//windows onload Validation
let params = (new URL(document.location)).searchParams;// Extract parameters from url
window.onload = function() {//call fuction on load
    let qty = [];//create qty array to store param data
    for (let i in products) {// loop through param data
        qty.push(params.get(`qty${i}`));// push param data to qty array
}

// Detect and display error banner
if (qty.some(q => q !== null)) {//detect if qty has any values (qty should only have values if the form was submitted previously, new forms are excepmt from error banners)
    if (qty.every(q => q == 0)){//if there are values, detect if all values are 0
        document.getElementById("errMsg").innerHTML="Select a purchase quantity" //let them know they made no purchase
    } 
    else{
        if (qty.some(q => q !== 0)){// detect if values contain non 0
        document.getElementById("errMsg").innerHTML="Invalid Purchase: Purchase quantity must be a positive interger"// if so display invalid number error banner (this should only trigger if a user clicks purchase with an invalib number)
        }
    }
}

//re-enter answers from previous form into repective textboxes
for ([i] in qty){
    text_Value=Number(qty[i])
    textbox=document.getElementById(`qty${[i]}_entered`)
textbox.value=text_Value;
checkInputTextbox(textbox) //validate reentered data
}

}