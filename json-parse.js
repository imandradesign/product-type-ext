// Finds page URL with slug and creates JSON URL
let find_url = window.location.href;
let json_url = find_url + '?format=json';

// Fetch the JSON from the URL and print logs to console
const response = fetch(json_url);
const myJson = response.json();

// Save product['items'] into the variable "products" and print it to console.
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

// Adding DIV to page
var div = document.createElement('div');

// Generate HTML within div
div.innerHTML = "<div id='overlay' onclick='off()'>\
  <div id='text'>\
  <p>Physical Products:<span id='physicalCount'></span></p>\
  <p>Digital Products:<span id='digitalCount'></span></p>\
  <p>Service Products:<span id='serviceCount'></span></p>\
  <p>Gift Cards:<span id='giftCardCount'></span></p>\
</div>";

// Append DIV to the page
document.body.appendChild(div);
