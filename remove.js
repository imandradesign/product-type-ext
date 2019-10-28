var determineOverlay = document.getElementById('prod-type-overlay');

if (determineOverlay !== null){
  document.getElementById('prod-type-overlay').remove();
}

var determineError = document.getElementById('error-message');

if (determineError !== null){
  document.getElementById('error-message').remove();
}

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

removeColorByClass("prod-colors");
removeOpacityByClass("prod-opacity");
