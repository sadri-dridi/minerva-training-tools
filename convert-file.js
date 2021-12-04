
console.log("BLE")
window.test = window.test || {}; 

test.Files = function() {}

test.Files.prototype = {       
  convertFile: (archive, id) => {
    console.log("CHEGOU", archive);
    chrome.tabs.sendMessage(id,archive);
  }
}
