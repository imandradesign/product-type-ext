/**********************************************************
Add visible DIV element to display the product count on the page
*********************************************************/

// Variant to create DIV element
var div = document.createElement('div');

// Generate HTML within div
<<<<<<< HEAD
div.innerHTML = "<div id='prod-type-overlay'>\
=======
div.innerHTML = "<div id='prod-type-overlay' onclick='off()'>\
>>>>>>> 01f8a75704771ecddfeca04f5c452a3c119f623e
  <div id='pd-text'>\
  <p>Physical Products: <span id='physicalCount'></span></p>\
  <p>Digital Products: <span id='digitalCount'></span></p>\
  <p>Service Products: <span id='serviceCount'></span></p>\
  <p>Gift Cards: <span id='giftCardCount'></span></p>\
  </div>\
<<<<<<< HEAD
  <button id='pd-button'>CLOSE</button>\
  </div>";
=======
  <button id='pd-button'>CLOSE</button>";
  
  "<div id='error-message'>\
  <div id='error-message-text'>\
  <h1>USEAGE ERROR</h1>\
  <p>This tool only works when enabled on a Product Page while logged out.</p>\
  </div>\
  <div id='error-button' onclick='off()'>CLOSE</button></div>";
>>>>>>> 01f8a75704771ecddfeca04f5c452a3c119f623e

// Append DIV to the page
document.body.appendChild(div);

/**********************************************************
Finds the JSON URL and finds the product type for each item on the Products Page
*********************************************************/

// Finds page URL with slug and creates JSON URL
var json_url = window.location.href + '?format=json';

<<<<<<< HEAD
// Allow "Close" buttons to function
var button = document.getElementById('pd-button');

button.onclick = function() {
  var determineOverlay = document.getElementById('prod-type-overlay');

  if (determineOverlay !== null){
    document.getElementById('prod-type-overlay').remove();
  }
};


=======
// Allow "Close" button to function
var button = document.getElementById('pd-button');

button.onclick = function() {
  var div = document.getElementById('prod-type-overlay');
  if (div.style.display !== 'none') {
      div.style.display = 'none';
  }
  else {
      div.style.display = 'block';
  }
};
>>>>>>> 01f8a75704771ecddfeca04f5c452a3c119f623e

// Asynchronus function to fetch JSON data
async function info() {
    try {
      // Fetch the JSON from the URL
      var response = await fetch(json_url);
      var myJson = await response.json();
    } catch (error) {
        // Error handling
        alert("This isn't working! Unable to pull JSON information.");
    } finally {
<<<<<<< HEAD
=======
      
>>>>>>> 01f8a75704771ecddfeca04f5c452a3c119f623e
      // If the page is not a Product Page (collection type 13), throw an error
      if (myJson['collection']['type'] != 13){
        var determineOverlay = document.getElementById('prod-type-overlay');

        if (determineOverlay !== null){
          document.getElementById('prod-type-overlay').remove();
        }

        console.log("Not a products page");
        var error_msg = document.createElement('div');

        div.innerHTML = "<div id='error-message'>\
        <div id='error-message-text'>\
        <h1>USAGE ERROR</h1>\
        <p>This tool only works when enabled on a Product Page while logged out.</p>\
        </div>\
        <button id='error-button'>CLOSE</button>\
        </div>"

        document.body.appendChild(error_msg);

        var error_button = document.getElementById('error-button');

        error_button.onclick = function() {
          var determineError = document.getElementById('error-message');

          if (determineError !== null){
            document.getElementById('error-message').remove();
          }
        };
      }

      // If the page is a Product Page, continue on.
      else {
        // After try/catch is done, do this whether there was error or not. Save product['items'] into the variable "products" and print it to console.
        var products = myJson['items'];
        console.log(products);

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
}

info();
