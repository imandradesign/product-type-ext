// Variables for keeping track of browser tabs
var browserTabs = [];

// Enable browser extension
function enable(tab){
  browserTabs[tab].state = true;
  chrome.browserAction.setIcon({path: "img/box48.png", tabId:browserTabs[tab].id});
  chrome.tabs.executeScript({
    file: 'json-parse.js'
  });
  chrome.tabs.insertCSS({
    file: 'styles.css'
  });
};

// Disable browser extension
function disable(tab){
  browserTabs[tab].state = false;
  chrome.browserAction.setIcon({path: "img/box48-b.png", tabId:browserTabs[tab].id});
  chrome.tabs.executeScript({
    file: 'remove.js'
  });
};

// Click function on extension that checks browser IDs
chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var currentTab = tabs[0].id;
    var alreadyAdded = false;

    for (let i = 0; i < browserTabs.length; i++){
      if (browserTabs[i].id === currentTab){
        alreadyAdded = true;
      }
    }

    if (alreadyAdded === false){
      browserTabs.push({id:currentTab , state:true});

      for (let i = 0; i < browserTabs.length; i++){
        if (browserTabs[i].id === currentTab){
          enable(i);
        }
      }
    } else if (alreadyAdded === true){
      for (let i = 0; i < browserTabs.length; i++){
        if (browserTabs[i].id === currentTab){
          if (browserTabs[i].state === false){
            enable(i);
          } else if (browserTabs[i].state === true){
            disable(i);
          }
        }
      }
    }
  });
});

// Disable extension when navigating to a new page
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(changeInfo.status === "loading") {
    for (var i = 0; i < browserTabs.length; i++){
      if (browserTabs[i].id === currentTab){
        browserTabs[i].state = false;
        chrome.browserAction.setIcon({path: "img/box48-b.png", tabId:browserTabs[tab].id});
      }
    }
  };
});
