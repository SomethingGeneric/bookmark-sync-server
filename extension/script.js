function auth(mode) {

  var endpoint = "";

  browser.storage.local.get("endpoint").then((result) => {
    if (result.endpoint) {
      endpoint = result.endpoint;
    } else{
      return false;
    }
  });

  const data = {
    "username": document.getElementById("username").value,
    "password": document.getElementById("password").value
  };

  const other = {
    body: data,
    method: "post"
  };

  var m = ""; 

  if (mode == "signin") {
    m = "/login";
  } else if (mode == "register") {
    m = "/register";
  }

  fetch(endpoint+m, other).then(data=>{console.log(data);}).then(res=>{console.log(res);}).catch(error=>console.log(error));
  
  return true;
  
  }
  
  function fetchBookmarks() {
    fetch(endpoint + '/bookmarks')
      .then(response => response.json())
      .then(bookmarks => {
        bookmarks.forEach(bookmark => {
          if (!bookmarkExists(bookmark)) {
            addBookmark(bookmark);
          }
        });
  
        getLocalBookmarks().forEach(localBookmark => {
          if (!bookmarks.includes(localBookmark)) {
            removeBookmark(localBookmark);
          }
        });
      })
      .catch(error => console.log(error));
  }

function showE(id) {
  document.getElementById(id).hidden = false;
}

function hideE(id) {
  document.getElementById(id).hidden = true;
}

document.addEventListener("DOMContentLoaded", function () {

    var endpoint = "https://example.com";
    var session = "";

    var panels = ["endpointset", "endpointremove", "loginsignup", "signinbutton", "registerbutton", "signout"];

    for (const tpanel of panels) {
      hideE(tpanel);
    }

    browser.storage.local.get("session").then((result) => {
      if (result.session) {
        session = result.session;
        showE("signout");
      } else {
        console.log("There was no session token.");
        hideE("signinbutton");
        hideE("registerbutton");
      }
    });

    browser.storage.local.get("endpoint").then((result) => {
      if (result.endpoint) {
        endpoint = result.endpoint;
        console.log("There was one: " + endpoint);
        showE("endpointremove");
        showE("loginsignup");
      } else {
        console.log("There was none.");
        showE("endpointset");
      }
    });

    document.getElementById("endpointsetbutton").addEventListener("click", function () {
      endpoint = document.getElementById("theend").value;
      browser.storage.local.set({ endpoint: endpoint });
      console.log("Endpoint set to: " + endpoint);
      hideE("endpointset");
      showE("endpointremove");
      showE("loginsignup");
      showE("signinbutton");
      showE("registerbutton");
    });

    document.getElementById("endpointremovebutton").addEventListener("click", function () {
      browser.storage.local.remove("endpoint");
      console.log("Endpoint removed.");
      hideE("endpointremove");
      showE("endpointset");
    });

    document.getElementById("signinbutton").addEventListener("click", function () {  
      auth("signin")
    });

    document.getElementById("registerbutton").addEventListener("click", function () {
      auth("register")
    });

  });
  