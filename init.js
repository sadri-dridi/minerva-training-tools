var EVENT_FROM_PAGE = '__rw_chrome_ext_' + new Date().getTime();

function fnAddButtons() {

    let btn = document.createElement("btn");
    let div = document.createElement("div")
    div.innerHTML = `<div id="amplify-modal" class="modal"><span class="close">&times;</span><img class="modal-content" id="img01"><div id="caption"></div></div>`
    
    btn.id = "amplify";
    btn.className = "amplify";
    btn.textContent = "⤢"
    
    document.body.appendChild(btn);
    document.body.appendChild(div);
}

function addIframe(url) {

    let iframe = document.getElementsByTagName('iframe')
    
    var s = trim(url);
    if(!s){
        return;
    }
    else{
        let final_url = 'https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(s)
        console.log(final_url)
        iframe[0].src = final_url
    }
}


async function fnDefineEvents() {
    console.log("ENTRA")
    
    let modal = document.getElementById("amplify-modal");
    let extension = /.(pdf|doc|docx|zip)/;

    let button = document.getElementById("amplify");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    
    button.onclick = function(){
        console.log("AKI ENTRA NEH POHA")
        let iframe = document.getElementsByTagName('iframe')
        if ((iframe && iframe.length > 0)){
            let src = iframe[0].src
            if (!src.match(extension)){
                let caption = document.getElementsByClassName("enrollment-info--tabs--tab active")
                modal.style.display = "block";
                modalImg.src = iframe[0].src;
                captionText.innerHTML = caption[0].textContent;
            }
        }
        
    }

    let closeBtn = document.getElementsByClassName("close")[0];

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    
    

}

function trim(str) {
    return str.replace(/^\s*|\s*$/g,"");
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.fileUrl){
            addIframe(request.fileUrl)
        }

    })



// getAnswers();
fnAddButtons();
fnDefineEvents();





