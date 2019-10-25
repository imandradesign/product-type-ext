/**********************************************************
Add visible DIV element to display the product count on the page
*********************************************************/

// Variant to create DIV element
var div = document.createElement('div');

// Generate HTML within div
div.innerHTML = "<div id='prod-type-overlay'>\
  <div id='pd-text'>\
  <p>Physical Products: <span id='physicalCount'></span></p>\
  <p>Digital Products: <span id='digitalCount'></span></p>\
  <p>Service Products: <span id='serviceCount'></span></p>\
  <p>Gift Cards: <span id='giftCardCount'></span></p>\
  </div>\
  <button id='pd-button'>CLOSE</button>\
  </div>";

// Append DIV to the page
document.body.appendChild(div);

/**********************************************************
Finds the JSON URL and finds the product type for each item on the Products Page
*********************************************************/

// Finds page URL with slug and creates JSON URL
var json_url = window.location.href + '?format=json';

// Allow "Close" buttons to function
var button = document.getElementById('pd-button');

button.onclick = function() {
  var determineOverlay = document.getElementById('prod-type-overlay');

  if (determineOverlay !== null){
    document.getElementById('prod-type-overlay').remove();
  }
};



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
      // If the page is not a Product Page (collection type 13), throw an error
      if (myJson['collection']['type'] != 13){
        var determineOverlay = document.getElementById('prod-type-overlay');

        if (determineOverlay !== null){
          document.getElementById('prod-type-overlay').remove();
        }

        // Create HTML error message pop up when visitor isn't on a Squarespace Products Page
        var error_msg = document.createElement('div');

        div.innerHTML = "<div id='error-message'>\
        <div id='error-message-text'>\
        <p>This tool only works when enabled on a Product Page while logged out.</p>\
        </div>\
        <button id='error-button'>CLOSE</button>\
        </div>"

        document.body.appendChild(error_msg);

        // Function to properly remove injected HTML for error when "Close" button is clicked
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
          let prodId = products[i].id;
          var element = document.querySelector('[data-item-id="' + prodId + '"]');
          var elementCss = "[data-item-id = '" + prodId + "']";

          var style = document.createElement('style');

          if (products[i].productType == 1){
            document.head.appendChild(style);
            style.sheet.insertRule(elementCss + '{border: red 2px solid !important;}');
            physicalCount ++;
            } else if (products[i].productType == 2){
              document.head.appendChild(style);
              style.sheet.insertRule(elementCss + '{border: blue 2px solid !important;}');
              digitalCount ++;
            } else if (products[i].productType == 3){
              document.head.appendChild(style);
              style.sheet.insertRule(elementCss + '{border: yellow 2px solid !important;}');
              serviceCount ++;
            } else if (products[i].productType == 4){
              document.head.appendChild(style);
              style.sheet.insertRule(elementCss + '{border: purple 2px solid !important;}');
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
