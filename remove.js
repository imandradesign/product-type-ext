// Remove overlay HTML from the page
var determineOverlay = document.getElementById('prod-type-overlay');

if (determineOverlay !== null){
  document.getElementById('prod-type-overlay').remove();
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

// Removes product type and icons from individual products
function removeTypeCheckByClass(className){
    var element = document.getElementsByClassName('type-check');
    while(element.length > 0){
        element[0].parentNode.removeChild(element[0]);
    }
}


removeColorByClass("prod-colors");
removeOpacityByClass("prod-opacity");
removeTypeCheckByClass("sub-check");
