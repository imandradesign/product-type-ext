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
Check if URL is a Category/Tag view of a Product Page
*****************************************************/
currentUrl = window.location.href;
split = currentUrl.split("?");
// If there is a "?" in the URL, and text after the question mark, guide the user to non-filtered page.
if(split[1] != null){
  // Create HTML error message when visitor isn't on a Squarespace Products Page
  // Point the user to the non-filtered URL which is stored in split[0]
  var determineOverlay = document.getElementById("prod-type-overlay");
  determineOverlay.innerHTML = "<div id='error-message'>\
  <div style='font-size:12px !important; line-height:16px !important; font: 400 Helvetica, sans-serif !important;'>You may be viewing a filtered page. Please navigate to the non-filtered page below:<br><br><span id='non-filtered-url'></span></div>\
  </div>"
  document.getElementById("non-filtered-url").textContent = split[0];
  }
else{

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
        <div style='font-size:22px !important; line-height:22px !important; font: 400 Helvetica, sans-serif !important;'>Please navigate to a Squarespace <span id='pp-error'>Products Page</span> while logged out.</div>\
        </div>"
      }
      // If the page is a Product Page, continue on.
      else {
        // Append DIV to the page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div id='pd-text'>\
        <div style='color:#186976;'>Physical Products: <span id='physicalCount'></span></div>\
        <br>\
        <div style='color:#BCDE28;'>Digital Products: <span id='digitalCount'></span></div>\
        <br>\
        <div style='color:#3EF5A4;'>Service Products: <span id='serviceCount'></span></div>\
        <br>\
        <div style='color:#5F0D73;'>Gift Cards: <span id='giftCardCount'></span></div>\
        <hr>\
        <div style='color:black; font-size:14px !important;'>✓ Subscription Products: <span id='subCount'></span></div>\
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
          prodOpacity.innerHTML = elementCss + " img, ProductListImageLoader {opacity: 0.5 !important;}";
          document.head.appendChild(prodOpacity);

          // Checks JSON data for the product type and updates the styles for individual products on the page and adjusts the product type counter in the overlay.
          if (products[i].productType == 1){
            document.head.appendChild(prodColor);
            prodColor.innerHTML = elementCss + '{outline: 6px solid #186976 !important; background-color: #186976 !important;};';
            physicalCount ++;
            } else if (products[i].productType == 2){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 6px solid #BCDE28 !important; background-color: #BCDE28 !important};';
              digitalCount ++;
            } else if (products[i].productType == 3){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 6px solid #3EF5A4 !important; background-color: #3EF5A4};';
              serviceCount ++;
            } else if (products[i].productType == 4){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 6px solid #5F0D73 !important; background-color: #5F0D73};';
              giftCardCount ++;
            }

          // Checks for subscription products, updates the count, and add a checkmark next to individual products
          if (products[i].isSubscribable === true){
            element.innerHTML += "<div class='sub-check' style='font-size:13px; color:white;'><span style='font-size:27px;'>✓</span> Subscription</div>"
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
} 