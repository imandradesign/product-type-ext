
chrome.browserAction.onClicked.addListener(function(tab){
  function enable(tab){
    chrome.tabs.executeScript({
    	file: 'json-parse.js'
    });
    chrome.tabs.insertCSS({
      file: 'styles.css'
    });
  };

  function disable(tab){
    var determineOverlay = document.getElementById('overlay');

    if (determineOverlay !== null){
      document.getElementById('overlay').remove();
    }
  };
});
