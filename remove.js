var determineOverlay = document.getElementById('prod-type-overlay');

if (determineOverlay !== null){
  document.getElementById('prod-type-overlay').remove();
}

var determineError = document.getElementById('error-message');

if (determineError !== null){
  document.getElementById('error-message').remove();
}


function removeElementsByClass(className){
    var prodCss = document.getElementsByClassName('prod-colors');
    while(prodCss.length > 0){
        prodCss[0].parentNode.removeChild(prodCss[0]);
    }
}

removeElementsByClass("prod-colors");

console.log(prodCss)
