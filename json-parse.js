/**********************************************************
Add visible DIV element to display the product count on the page
*********************************************************/
// Variant to create DIV element
var overlay_div = document.createElement('div');

// Generate HTML within div
overlay_div.innerHTML = "<div id='prod-type-overlay'>\
  </div>";

// Append DIV to the page
document.body.appendChild(overlay_div);

/**********************************************************
Finds the JSON URL and finds the product type for each item on the Products Page
*********************************************************/

// Finds page URL with slug and creates JSON URL
var json_url = window.location.href + '?format=json';

// Variable for overlay
var determineOverlay = document.getElementById('prod-type-overlay');


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
        // Create HTML error message when visitor isn't on a Squarespace Products Page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div id='error-message'>\
        <p>Please navigate to a Squarespace Products Page while logged out.</p>\
        </div>"
      }

      // If the page is a Product Page, continue on.
      else {
        // Append DIV to the page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div id='pd-text'>\
        <p>Physical Products: <span id='physicalCount'></span></p>\
        <p>Digital Products: <span id='digitalCount'></span></p>\
        <p>Service Products: <span id='serviceCount'></span></p>\
        <p>Gift Cards: <span id='giftCardCount'></span></p>\
        </div>";

        var imageOpacity = document.createElement('style');
        imageOpacity.innerHTML = "img.loaded {opacity: 0.5;}";
        document.body.appendChild(imageOpacity);

        // After try/catch is done, do this whether there was error or not. Save product['items'] into the variable "products".
        var products = myJson['items'];

        // Initialize the count for each product type.
        var physicalCount = 0;
        var digitalCount = 0;
        var serviceCount = 0;
        var giftCardCount = 0;

        for (var i = 0; products[i]; i++){
          let prodId = products[i].id;
          var element = document.querySelector('[data-item-id="' + prodId + '"]');
          var elementCss = "[data-item-id = '" + prodId + "']";

          var prodColor = document.createElement('style');
          prodColor.className = "prod-colors"

          if (products[i].productType == 1){
            document.head.appendChild(prodColor);
            prodColor.innerHTML = elementCss + '{outline: 5px solid red; !important; background-color: red !important;}; ' + "img.loaded {opacity: 0.5;}";
            physicalCount ++;
            } else if (products[i].productType == 2){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 5px solid blue; !important; background-color: blue !important}; ' + "img.loaded {opacity: 0.5;}";
              digitalCount ++;
            } else if (products[i].productType == 3){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 5px solid yellow; !important; background-color: yellow}; ' + "img.loaded {opacity: 0.5;}";
              serviceCount ++;
            } else if (products[i].productType == 4){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 5px solid purple; !important; background-color: purple}; ' + "img.loaded {opacity: 0.5;}";
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
