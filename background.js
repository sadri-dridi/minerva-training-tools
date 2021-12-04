// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     console.log("AAAAA")
    
//     chrome.tabs.executeScript(null,{file:"init.js"});
// });

console.log("N")
chrome.downloads.onCreated.addListener((item) => {
        console.log("ITEM", item);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let extension = /.zip/;
            if (!item.finalUrl.match(extension)){
                var currTab = tabs[0];
                chrome.tabs.sendMessage(currTab.id, {fileUrl: item.finalUrl});  
                chrome.downloads.cancel(item.id)
            }


    })
    
    
  });