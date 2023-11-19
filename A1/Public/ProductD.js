document.querySelector('.row').innerHTML += `
        <div class="col-md-6 product_card" style="margin-bottom: 40px; padding: 15px;">
            <div>
                <h5 style="float: left;" class="product_name">${products[i].name}</h5>
                <h5 style="float: right;">$${(products[i].price).toFixed(2)}</h5>
            </div>  
            <img src="${products[i].image}" class="img-thumbnail" alt="${products[i].alt}">
            <div style="height: 90px;">
                <table style="width: 100%; text-align: center; font-size: 18px;" id="product_table">
                    <tr>
                        <td style="text-align: left; width: 35%;">Available: ${products[i].qty_available}</td>

                        <td style="text-align: center; width: 35%;" rowspan="2">
                        <div style="border-radius: 50px; border: 2px solid black; width: 70%; height: 40px; float: right;">
                            <button type="button" class="qtyButton highlight" onclick="document.getElementById('qty${[i]}_entered').value--; checkInputTextbox(qty${[i]}_entered);">--</button>

                            <input type="text" autocomplete="off" placeholder="0" name="qty${[i]}" id="qty${[i]}_entered" class="inputBox" onchange="checkInputTextbox(this)">

                            <button type="button" class="qtyButton highlight" onclick="document.getElementById('qty${[i]}_entered').value++; checkInputTextbox(qty${[i]}_entered);">+</button>
                    </div>

                            <label id="qty${[i]}_label" style="margin: 6px 0; float: right; padding-right: 10px;">Qty:</label>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 35%;" id="qty_sold${i}">Sold: ${products[i].qty_sold}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="padding-top: 5px;"><div id="qty${[i]}_error" style="color: red;"></div></td>
                    </tr>
                </table>
            </div>  
        </div>
    `;

//GET PRODUCTS O DISPLAY
//call product js in gegining Script source, ./product.js
// 


//JUST LOOP to populate
// Validation of inputr
//windows onload'
//input box onchange

// GET CLient

//in invoicejs
// use black magic to capture url parameters