/********************************************************
Add visible DIV element to display the product count on the page
*****************************************************/
// Variant to create DIV element
var overlay_div = document.createElement('div');

// Generate HTML within div
overlay_div.innerHTML = "<div id='prod-type-overlay'>\
  </div>";

// Append DIV to the page
document.body.appendChild(overlay_div);

/********************************************************
Finds the JSON URL and finds the product type for each item on the Products Page
*****************************************************/

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
        alert("Please log out of Squarespace to use this extension. If you're viewing a page that filters by tag or category, go to the direct Products Page instead.");
        document.getElementById("prod-type-overlay").remove();
    } finally {
      // If the page is not a Product Page (collection type 13), throw an error
      if (myJson['collection']['type'] != 13){
        // Create HTML error message when visitor isn't on a Squarespace Products Page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div id='error-message'>\
        <p style='font-size:22px !important; line-height:22px !important; font: 400 Helvetica, sans-serif !important;'>Please navigate to a Squarespace Products Page while logged out.</p>\
        </div>"
      }
      // If the page is a Product Page, continue on.
      else {
        // Append DIV to the page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div id='pd-text'>\
        <p style='color:#186976;'>Physical Products: <span id='physicalCount'></span></p>\
        <p style='color:#BCDE28;'>Digital Products: <span id='digitalCount'></span></p>\
        <p style='color:#3EF5A4;'>Service Products: <span id='serviceCount'></span></p>\
        <p style='color:#5F0D73;'>Gift Cards: <span id='giftCardCount'></span></p>\
        <hr>\
        <p style='color:black'>Subscription Products: <span id='subCount'></span></p>\
        </div>";


        // After try/catch is done, do this whether there was error or not. Save product['items'] into the variable "products".
        var products = myJson['items'];

        // Initialize the count for each product type.
        var physicalCount = 0;
        var digitalCount = 0;
        var serviceCount = 0;
        var giftCardCount = 0;
        var subscriptionCount = 0;

        // Loops through JSON data and finds the product type
        for (var i = 0; products[i]; i++){
          // Sets up a variable that automatically has the correct CSS selector and ID of each individual product
          let prodId = products[i].id;
          var element = document.querySelector('[data-item-id="' + prodId + '"]');
          var elementCss = "[data-item-id = '" + prodId + "']";

          // Variables for adding a new style element
          var prodColor = document.createElement('style');
          prodColor.className = "prod-colors";

          var prodOpacity = document.createElement('style');
          prodOpacity.className = "prod-opacity";

          // If an image loads, it changes the opacity to 50% for each image.
          prodOpacity.innerHTML = elementCss + " img.loaded {opacity: 0.5;}";
          document.head.appendChild(prodOpacity);

          // Checks JSON data for the product type and updates the styles for individual products on the page and adjusts the product type counter in the overlay.
          if (products[i].productType == 1){
            document.head.appendChild(prodColor);
            prodColor.innerHTML = elementCss + '{outline: 5px solid #186976 !important; background-color: #186976 !important;};';
            physicalCount ++;
            } else if (products[i].productType == 2){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 5px solid #BCDE28 !important; background-color: #BCDE28 !important};';
              digitalCount ++;
            } else if (products[i].productType == 3){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 5px solid #3EF5A4 !important; background-color: #3EF5A4};';
              serviceCount ++;
            } else if (products[i].productType == 4){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 5px solid #5F0D73 !important; background-color: #5F0D73};';
              giftCardCount ++;
            }

          // Checks for subscription products and updates the count
          if (products[i].isSubscribable === true){
            subscriptionCount ++;
          }
        }

        // Display the product type count within the DIV spans
        document.getElementById("physicalCount").textContent = physicalCount;
        document.getElementById("digitalCount").textContent = digitalCount;
        document.getElementById("serviceCount").textContent = serviceCount;
        document.getElementById("giftCardCount").textContent = giftCardCount;
        document.getElementById("subCount").textContent = subscriptionCount;
      }
    }
}

info();
