// Remove overlay HTML from the page
var determineOverlay = document.getElementById('prod-type-overlay');

if (determineOverlay !== null){
  document.getElementById('prod-type-overlay').remove();
}

// Remove error text from the page
var determineError = document.getElementById('error-message');

if (determineError !== null){
  document.getElementById('error-message').remove();
}


// Remove style classes that apply color and change image opacity to individual products on the page
function removeColorByClass(className){
    var element = document.getElementsByClassName('prod-colors');
    while(element.length > 0){
        element[0].parentNode.removeChild(element[0]);
    }
}

function removeOpacityByClass(className){
    var element = document.getElementsByClassName('prod-opacity');
    while(element.length > 0){
        element[0].parentNode.removeChild(element[0]);
    }
}

// Removes ✓ checkmark from individual subscription products
function removeSubCheckByClass(className){
    var element = document.getElementsByClassName('sub-check');
    while(element.length > 0){
        element[0].parentNode.removeChild(element[0]);
    }
}


removeColorByClass("prod-colors");
removeOpacityByClass("prod-opacity");
removeSubCheckByClass("sub-check");
