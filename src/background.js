
/* When the content scripts makes contact, 
 * set the page-action's icon and popup */
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.onTwitter === true) {
      chrome.browserAction.setIcon({
          tabId: sender.tab.id,
          path: "img/icon16.png"
      });
  }
});

/* When the tab's address changes/reloads, 
* clear the popup and reset the icon.
* (If applicable, the newly injected content script will send a new message.) */
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status === "loading") {
      chrome.browserAction.setIcon({
          tabId: tabId,
          path: "img/inactive16.png"
      });
  }
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    } 
  }
);




