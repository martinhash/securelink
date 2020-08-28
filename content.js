chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let allTags = document.body.getElementsByTagName("a");
  const secures = Math.floor(Math.random() * allTags.length) + 1;
  const unSecures = Math.floor(Math.random() * allTags.length) + 1;
  if (request === "all") {
    sendResponse({ count: allTags.length });
  }
  if (request === "unsecure") {
    sendResponse({ count: unSecures });
  }
  if (request === "secure") {
    sendResponse({ count: secures });
  }
});
