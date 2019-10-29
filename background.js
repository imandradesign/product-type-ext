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

    // Loops through the browserTabs array to see if your current tab has been added yet or not
    for (let i = 0; i < browserTabs.length; i++){
      if (browserTabs[i].id === currentTab){
        alreadyAdded = true;
      }
    }

    // If the tab hasn't been added it's pushed to the array
    if (alreadyAdded === false){
      browserTabs.push({id:currentTab , state:true});

      // Loops through the browserTabs array and enables extension just for this tab
      for (let i = 0; i < browserTabs.length; i++){
        if (browserTabs[i].id === currentTab){
          enable(i);
        }
      }
    } else if (alreadyAdded === true){
      // If the tab has been added to the array already, it loops through the browserTabs array to find the current tab ID and either enable or disable the function based on the tab state
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

// Disables extension when refreshing or navigating to a new page
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var currentTab = tabs[0].id;
    if(changeInfo.status === "loading") {
      for (var i = 0; i < browserTabs.length; i++){
        if (browserTabs[i].id === currentTab){
          disable(i);
        }
      }
    };
  });
});
