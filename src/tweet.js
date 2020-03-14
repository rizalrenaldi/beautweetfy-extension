var onTwitter = ["://publish.twitter.com" ]
chrome.runtime.sendMessage({ onTwitter: true });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if( request.message === "clicked_browser_action" ) {
      var firstHref = document.getElementsByClassName("EmbedCode-code")[0].innerText;
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": "https://tweet.rizalrenaldi.com/?q=" + firstHref});
    }
  }
);






