chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request === "all") {
    const matches = document.body.getElementsByTagName("a");
    sendResponse({ count: matches.length });
  }
  if (request === "unsecure") {
    sendResponse({ count: 99 });
  }
  if (request === "secure") {
    sendResponse({ count: 99 });
  }
});
