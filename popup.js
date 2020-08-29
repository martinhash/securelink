document.addEventListener("DOMContentLoaded", function () {
  //dom
  document
    .querySelector("#btnAll")
    .addEventListener("click", getAllLinks, false);
  document
    .querySelector("#btnUnsecure")
    .addEventListener("click", getUnsecureLinks, false);
  document
    .querySelector("#btnSecure")
    .addEventListener("click", getSecureLinks, false);
  var title;
  getUnsecuresIfExist();
  chrome.tabs.getSelected(null, function (tab) {
    title = tab.title;
    $("#titleTab").html(
      `<b style="font-size: 0.8em;
      text-transform: uppercase;
      padding: 0px;">${title}</b>`
    );
  });

  function getUnsecuresIfExist() {
    clean();
    disabledButtons();
    $("#loadingUnsecure").removeClass("none");
    setTimeout(() => {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "all", startCount);
      });
    }, 1000);
  }

  function startCount(res) {
    if (res.unsecuredLinks.length > 0) {
      getUnsecureLinks();
    }
  }
  //ALL LINKS FUNCTIONS
  function getAllLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "all", setCountAll);
    });
  }
  function setCountAll(res) {
    clean();
    disabledButtons();
    $("#loadingAll").removeClass("none");
    setTimeout(() => {
      enabledButtons();
      appearAllStuff(res);
    }, 1000);
  }
  function appearAllStuff(res) {
    $("#btnAll").addClass("btn-focus");
    $("#loadingAll").addClass("none");
    $("#listAll").removeClass("none");
    if (res.unsecuredLinks.length > 0) {
      res.unsecuredLinks.forEach((unSecuredLink) => {
        $("#listAll").append(
          `<li class="list-group-item list-unsecured">${unSecuredLink.href}</li>`
        );
      });
    }
    if (res.securedLinks.length > 0) {
      res.securedLinks.forEach((securedLink) => {
        $("#listAll").append(
          `<li class="list-group-item list-secured">${securedLink.href}</li>`
        );
      });
    }
    if (res.securedLinks.length + res.unsecuredLinks.length > 5) {
      $(".list-group").addClass("scroll");
    }
  }

  //UNSECURES FUNCTIONS
  function getUnsecureLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "unsecure", setCountUnsecure);
    });
  }
  function setCountUnsecure(res) {
    clean();
    disabledButtons();
    $("#loadingUnsecure").removeClass("none");
    setTimeout(() => {
      enabledButtons();
      appearUnsecureStuff(res);
    }, 1000);
  }

  function appearUnsecureStuff(res) {
    $("#btnUnsecure").addClass("btn-focus");
    $("#loadingUnsecure").addClass("none");
    $("#listUnsecure").removeClass("none");
    if (res.unsecuredLinks.length > 0) {
      if (res.unsecuredLinks.length > 5) {
        $(".list-group").addClass("scroll");
      }
      res.unsecuredLinks.forEach((link) => {
        $("#listUnsecure").append(
          `<li class="list-group-item list-unsecured">${link.href}</li>`
        );
      });
    }
  }

  //SECURES FUNCTION
  function getSecureLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "secure", setCountSecure);
    });
  }
  function setCountSecure(res) {
    clean();
    disabledButtons();
    $("#loadingSecure").removeClass("none");
    setTimeout(() => {
      enabledButtons();
      appearSecureStuff(res);
    }, 1000);
  }

  function appearSecureStuff(res) {
    $("#btnSecure").addClass("btn-focus");
    $("#loadingSecure").addClass("none");
    $("#listSecure").removeClass("none");
    if (res.securedLinks.length > 0) {
      if (res.securedLinks.length > 5) {
        $(".list-group").addClass("scroll");
      }
      res.securedLinks.forEach((link) => {
        $("#listSecure").append(
          `<li class="list-group-item list-secured">${link.href}</li>`
        );
      });
    }
  }

  function disabledButtons() {
    $("#btnUnsecure").attr("disabled", true);
    $("#btnSecure").attr("disabled", true);
    $("#btnAll").attr("disabled", true);
  }

  function enabledButtons() {
    $("#btnUnsecure").attr("disabled", false);
    $("#btnSecure").attr("disabled", false);
    $("#btnAll").attr("disabled", false);
  }

  //CLEAN ALL LINKER TEXTS
  function clean() {
    $(".list-group-item").remove();
    $(".list-group").removeClass("scroll");

    $("#listAll").addClass("none");
    $("#txtAll").addClass("none");

    $("#txtUnsecure").addClass("none");
    $("#listSecure").addClass("none");

    $("#txtSecure").addClass("none");
    $("#listUnsecure").addClass("none");

    $("#btnAll").removeClass("btn-focus");
    $("#btnSecure").removeClass("btn-focus");
    $("#btnUnsecure").removeClass("btn-focus");

    $("#loadingUnsecure").addClass("none");
    $("#loadingSecure").addClass("none");
    $("#loadingAll").addClass("none");
  }
});
