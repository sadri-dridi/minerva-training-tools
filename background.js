// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     console.log("AAAAA")
    
//     chrome.tabs.executeScript(null,{file:"init.js"});
// });

chrome.downloads.onCreated.addListener((item) => {
    console.log(item);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        console.log(currTab.index)
        chrome.downloads.cancel(item.id)
        if (currTab) { 
            // chrome.tabs.sendMessage(currTab.index, item);
            var files = new test.Files;    
            files.convertFile(item, currTab.id);
            
        }
      });
    
  });