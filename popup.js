document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#btnAll")
    .addEventListener("click", getAllLinks, false);
  document
    .querySelector("#btnUnsecure")
    .addEventListener("click", getUnsecureLinks, false);
  document
    .querySelector("#btnSecure")
    .addEventListener("click", getSecureLinks, false);

  //ALL LINKS FUNCTION
  function getAllLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "all", setCountAll);
    });
  }
  function setCountAll(res) {
    clean();
    $("#txtAll").removeClass("none");
    $("#txtAll").html(`This page have ${res.count} Links`);
  }

  //UNSECURES FUNCTION
  function getUnsecureLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "unsecure", setCountUnsecure);
    });
  }
  function setCountUnsecure(res) {
    clean();
    $("#txtUnsecure").removeClass("none");
    $("#txtUnsecure").html(`This page have ${res.count} Unsecure Links`);
  }

  //SECURES FUNCTION
  function getSecureLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "secure", setCountSecure);
    });
  }
  function setCountSecure(res) {
    clean();
    $("#txtSecure").removeClass("none");
    $("#txtSecure").html(`This page have ${res.count} Secure Links`);
  }

  //CLEAN ALL LINKER TEXTS
  function clean() {
    $("#txtAll").addClass("none");
    $("#txtUnsecure").addClass("none");
    $("#txtSecure").addClass("none");
  }
});
