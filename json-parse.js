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
        <p style='color:#6D3737;'>Physical Products: <span id='physicalCount'></span></p>\
        <p style='color:#A39594;'>Digital Products: <span id='digitalCount'></span></p>\
        <p style='color:#EDBB9C;'>Service Products: <span id='serviceCount'></span></p>\
        <p style='color:#423E37;'>Gift Cards: <span id='giftCardCount'></span></p>\
        </div>";

        var productListCSS = document.createElement('style');
        productListCSS.innerHTML = "img.loaded {opacity: 0.2;}";
        document.body.appendChild(productListCSS);

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
            style.sheet.insertRule(elementCss + '{outline: 5px solid #6D3737; !important; background-color: #6D3737 !important;}');
            physicalCount ++;
            } else if (products[i].productType == 2){
              document.head.appendChild(style);
              style.sheet.insertRule(elementCss + '{outline: 5px solid #A39594; !important; background-color: #A39594 !important}');
              digitalCount ++;
            } else if (products[i].productType == 3){
              document.head.appendChild(style);
              style.sheet.insertRule(elementCss + '{outline: 5px solid #EDBB9C; !important; background-color: #EDBB9C}');
              serviceCount ++;
            } else if (products[i].productType == 4){
              document.head.appendChild(style);
              style.sheet.insertRule(elementCss + '{outline: 5px solid #423E37; !important; background-color: #423E37}');
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
