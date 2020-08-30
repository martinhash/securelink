chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var allTags = document.body.getElementsByTagName("a");
  var result = obtainLinks(allTags);
  if (request === "all") {
    sendResponse({
      securedLinks: result.securedLinks,
      unsecuredLinks: result.unsecuredLinks,
    });
  }
  if (request === "unsecure") {
    sendResponse({ unsecuredLinks: result.unsecuredLinks });
  }
  if (request === "secure") {
    sendResponse({ securedLinks: result.securedLinks });
  }
});

//AUTO INIT
var allTags = document.body.getElementsByTagName("a");
var result = obtainLinks(allTags);
if (result.unsecuredLinks.length > 0) {
  chrome.runtime.sendMessage({ action: "unsecured" });
}

function obtainLinks(allTags) {
  var securedLinks = [];
  var unsecuredLinks = [];
  var alreadyExist = {}; //memoize/cache

  for (let item of allTags) {
    var domain = item.href
      .replace("http://", "")
      .replace("https://", "")
      .split(/[/?#]/)[0];
    if (!alreadyExist[domain]) {
      if (item.href.substr(0, 5) == "http:") {
        unsecuredLinks.push({ href: item.href });
      } else {
        if (item.href.substr(0, 5) == "https") {
          securedLinks.push({ href: item.href });
        }
      }
    }
    alreadyExist[domain] = true;
  }
  return { securedLinks: securedLinks, unsecuredLinks: unsecuredLinks };
}
