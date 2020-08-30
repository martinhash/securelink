chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // read `newIconPath` from request and read `tab.id` from sender
  if (request.action === "unsecured") {
    chrome.browserAction.setIcon({
      path: "./images/icon_24.png",
      tabId: sender.tab.id,
    });
  }
});
