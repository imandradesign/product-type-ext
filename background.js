var isActive = false;

chrome.browserAction.onClicked.addListener(function(tab){

  if (isActive === false){
    enable();
  } else if (isActive === true){
    disable();
  }

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

  function disable(tab){
    isActive = false;

    chrome.browserAction.setIcon({path: "img/box48-b.png"});

    var determineOverlay = document.getElementById('overlay');

    if (determineOverlay !== null){
      document.getElementById('overlay').remove();
    }
  };
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status === "loading") {
		isActive = false;
	}
});
