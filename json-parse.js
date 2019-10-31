// Linking the font using Google Fonts
var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Cabin|Montserrat&display=swap');
document.head.appendChild(link);

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
var currentUrl = window.location.href;
var currentSlug = window.location.pathname;
var splitFilter = currentUrl.split("?");
var splitConfig = currentSlug.split("/");
var filterUrl = splitFilter[0];
var configSlug = splitConfig[1];

// Find the "This is Squarespace comment in site's HTML"
var findComments = function(el) {
  var arr = [];
  for(var i = 0; i < el.childNodes.length; i++) {
    var node = el.childNodes[i];
    if(node.nodeType === 8) {
        arr.push(node);
    } else {
        arr.push.apply(arr, findComments(node));
      }
    }
    return arr;
  };

  var commentNodes = findComments(document);
  var sqspCheck = commentNodes[0].nodeValue;

// If there is a "?" in the URL, and text after the question mark, guide the user to non-filtered page.
if (configSlug === "config"){
  var determineOverlay = document.getElementById("prod-type-overlay");
  determineOverlay.innerHTML = "<div class='error-message' style='font-size:22px !important; line-height:25px !important; padding-top:50px !important;'>View a <br><span class='pp-error'>Products Page</span><br> while logged out to view the data.\
  </div>"
} else if (sqspCheck !== " This is Squarespace. "){
    var determineOverlay = document.getElementById("prod-type-overlay");
    determineOverlay.innerHTML = "<div class='error-message' style='font-size:20px; line-height:22px !important; padding-top:50px !important;'>Please navigate to a Squarespace website <br><span class='pp-error'>Products Page</span><br> while logged out to view data.\
    </div>"
  } else if (splitFilter[1] != null){
  // Create HTML error message when visitor isn't on a Squarespace Products Page
  // Point the user to the non-filtered URL which is stored in split[0]
  var determineOverlay = document.getElementById("prod-type-overlay");
  determineOverlay.innerHTML = "<div class='error-message' style='font-size:18px; line-height:18px !important; padding-top:40px !important;'>You may be viewing a filtered page. Please navigate to the unfiltered page below:\
  <br><br><br>\
  <a href='" + filterUrl +
  "' id ='error-url'>Full Products Page Link</a>\
  </div>"
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
        alert("Please log out and view a Squarespace website Products Page to use this extension.");
        document.getElementById("prod-type-overlay").remove();
    } finally {
      // If the page is not a Product Page (collection type 13), throw an error
      if (myJson['collection']['type'] != 13){
        // Create HTML error message when visitor isn't on a Squarespace Products Page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div class='error-message'>\
        <div style='font-size:22px !important; line-height:25px !important; padding-top:50px;'>Please navigate to a Squarespace <br><span class='pp-error'>Products Page</span><br> to view data.</div>\
        </div>"
      } else if (myJson['item']){
        // If user is viewing an individual product instead of a Products Page it asks them to go back to a Products page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div class='error-message'>\
        <div style='font-size:18px !important; line-height:22px !important; padding-top:40px !important;'>It looks like you're viewing an individual product.<br><br>Please navigate to a full <span class='pp-error'>Products Page</span>.</div>\
        </div>"
      }
      // If the page is a Product Page, continue on.
      else {
        // Append DIV to the page
        var determineOverlay = document.getElementById("prod-type-overlay");

        determineOverlay.innerHTML = "<div id='pd-text'>\
        <div style='color:#186976;'>⟰ Physical Products: <span id='physicalCount'></span></div>\
        <br>\
        <div style='color:#31D8D0;'>☲ Digital Products: <span id='digitalCount'></span></div>\
        <br>\
        <div style='color:#019c7c;'>▤ Service Products: <span id='serviceCount'></span></div>\
        <br>\
        <div style='color:#5F0D73;'>⫸ Gift Cards: <span id='giftCardCount'></span></div>\
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
            element.innerHTML += "<div class='type-check' style='font-size:12px; color:white;'><span style='font-size:20px;'>⟰</span> Physical<span class='subs' style='display:none'>, <span style='font-size:20px;'>✓</span> Subscription</span></div>"
            physicalCount ++;
            } else if (products[i].productType == 2){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 6px solid #31D8D0 !important; background-color: #31D8D0 !important};';
              element.innerHTML += "<div class='type-check' style='font-size:12px; color:white;'><span style='font-size:20px;'>☲</span> Digital<span class='subs' style='display:none'>, <span style='font-size:20px;'>✓</span> Subscription</span></div>"
              digitalCount ++;
            } else if (products[i].productType == 3){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 6px solid #019c7c !important; background-color: #019c7c};';
              element.innerHTML += "<div class='type-check' style='font-size:12px; color:white;'><span style='font-size:20px;'>▤</span> Service<span class='subs' style='display:none'>, <span style='font-size:20px;'>✓</span> Subscription</span></div>"
              serviceCount ++;
            } else if (products[i].productType == 4){
              document.head.appendChild(prodColor);
              prodColor.innerHTML = elementCss + '{outline: 6px solid #5F0D73 !important; background-color: #5F0D73};';
              element.innerHTML += "<div class='type-check' style='font-size:12px; color:white;'><span style='font-size:20px;'>⫸</span> Gift Card<span class='subs' style='display:none'>, <span style='font-size:20px;'>✓</span> Subscription</span></div>"
              giftCardCount ++;
            }

          // Checks for subscription products, updates the count, and add a checkmark next to individual products
          if (products[i].isSubscribable === true){
            var subsAdd = element.getElementsByClassName("subs")[0];
            subsAdd.style = "";
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
