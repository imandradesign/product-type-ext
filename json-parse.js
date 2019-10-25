/**********************************************************
Add visible DIV element to display the product count on the page
*********************************************************/

// Variant to create DIV element
var div = document.createElement('div');

// Generate HTML within div
div.innerHTML = "<div id='prod-type-overlay' onclick='off()'>\
  <div id='pd-text'>\
  <p>Physical Products: <span id='physicalCount'></span></p>\
  <p>Digital Products: <span id='digitalCount'></span></p>\
  <p>Service Products: <span id='serviceCount'></span></p>\
  <p>Gift Cards: <span id='giftCardCount'></span></p>\
  </div>\
  <button id='pd-button' onclick='btn_click()'>CLOSE</button>";

// Append DIV to the page
document.body.appendChild(div);

/**********************************************************
Finds the JSON URL and finds the product type for each item on the Products Page
*********************************************************/

// Finds page URL with slug and creates JSON URL
var json_url = window.location.href + '?format=json';

// Allow "Close" button to function
function btn_click() {
  document.getElementById("prod-type-overlay").style.display = "none !important";
}

// Asynchronus function to fetch JSON data
async function info() {
    try {
      // Fetch the JSON from the URL
      var response = await fetch(json_url);
      var myJson = await response.json();
    } catch (error) {
        // Error handling
        alert("This isn't working!");
    } finally {
        // After try/catch is done, do this whether there was error or not. Save product['items'] into the variable "products" and print it to console.
        var products = myJson['items'];

        // Initialize the count for each product type.
        var physicalCount = 0;
        var digitalCount = 0;
        var serviceCount = 0;
        var giftCardCount = 0;

        for (var i = 0; products[i]; i++){
          if (products[i].productType == 1){
            physicalCount ++;
            } else if (products[i].productType == 2){
              digitalCount ++;
            } else if (products[i].productType == 3){
              serviceCount ++;
            } else if (products[i].productType == 4){
              giftCardCount ++;
            }
        }

        // Display the product type count within the DIV spans
        document.getElementById("physicalCount").textContent = physicalCount;
        document.getElementById("digitalCount").textContent = digitalCount;
        document.getElementById("serviceCount").textContent = serviceCount;
        document.getElementById("giftCardCount").textContent = giftCardCount;
    }
}

info();
