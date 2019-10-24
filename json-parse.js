// Setting a constant URL that contains JSON for testing purposes
let URL = 'https://imandra-brine.squarespace.com/?format=json';
let debug = 1;

// Fetch the JSON from the URL and print logs to console
const response = await fetch(URL);
const myJson = await response.json();

// If debug == 1: 
// Print to console, the JSON that was pulled from the URL
if(debug == 1){
    console.log("URL used:" + URL);
    console.log("JSON from the URL:");
    console.log(myJson);
}

// Save product['items'] into the variable "products" and print it to console.
var products = myJson['items'];

// If debug == 1:
// Print all of the products pulled in JSON format
if(debug == 1){
    console.log('\n' + "Products in JSON format:");
    console.log(products);
    console.log('\n');
}


// Initialize the count for each product type.
var physicalCount = 0;
var digitalCount = 0;
var serviceCount = 0;
var giftCardCount = 0;

for(var i=0; products[i]; i++){

    // If debug == 1, print the current product number in iteration.
    if(debug == 1){
        console.log("Tallying Product Number:" + i);
    }
     
    if (products[i].productType == 1){
        // If product[].type == 1 -> Physical
        if(debug == 1){console.log("--> Physical Product" + '\n')}
        physicalCount ++;
    } 
    else if (products[i].productType == 2){
        // If product[].type == 2 -> Digital
        if(debug == 1){console.log("--> Digital Product" + '\n')}
        digitalCount ++;
    }
    else if (products[i].productType == 3){
        // If product[].type == 3 -> Service 
        if(debug == 1){console.log("--> Service Product" + '\n')}
        serviceCount ++;
    }
    else if (products[i].productType == 4){
        // If product[].type == 4 -> Gift Card 
        if(debug == 1){console.log("--> Gift Card Product" + '\n')}
        giftCardCount ++;
    }
}

// Print the tallied up total of each product type to console
console.log("Physical Products: " + physicalCount);
console.log("Digital Products: " + digitalCount);
console.log("Service Products: " + serviceCount);
console.log("Gift Card Products: " + giftCardCount);



// Filter JSON data to provide only the "ProductType" inforation


// Parse the number of each "ProductType" values to find a total for each