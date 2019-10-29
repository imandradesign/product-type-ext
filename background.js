// Variable to determine if extension is active or inactive
var isActive = false;
var browserTabs = [];

// Enable browser extension
function enable(tab){
  isActive = true;

  chrome.browserAction.setIcon({path: "img/box48.png"});

  chrome.tabs.executeScript({
    file: 'json-parse.js'
  });

  chrome.tabs.insertCSS({
    file: 'styles.css'
  });
};

// Disable browser extension
function disable(tab){
  isActive = false;

  chrome.browserAction.setIcon({path: "img/box48-b.png"});

  chrome.tabs.executeScript({
    file: 'remove.js'
  });
};

// Clicking the extension icon runs the json-parse.js or remove.js file to enable or disable
chrome.browserAction.onClicked.addListener(function(tab){
  if (isActive === false){
    enable();
  } else if (isActive === true){
    disable();
  }
});

// Disable extension when navigating to a new page
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(changeInfo.status === "loading") {
    disable();
  };
});
