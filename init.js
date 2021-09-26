(function () {
    function fnAddButtons() {

    
      var btn = document.createElement("btn");
      var div = document.createElement("div")
      div.innerHTML = `<div id="myModal" class="modal"><span class="close">&times;</span><img class="modal-content" id="img01"><div id="caption"></div></div>`
      
      btn.id = "amplify";
      btn.className = "amplify";
      btn.textContent = "⤢"
      document.body.appendChild(btn);
      document.body.appendChild(div);
    }

    async function fnDefineEvents() {
        
        var modal = document.getElementById("myModal");
        var extension = /.pdf/;

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var button = document.getElementById("amplify");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        button.onclick = function(){
            console.log("ENTROUY")
            var iframe = document.getElementsByTagName('iframe')
            console.log(iframe[0].src)
            if ((iframe && iframe.length > 0)){
                let src = iframe[0].src
                if (!src.match(extension)){
                    var caption = document.getElementsByClassName("enrollment-info--tabs--tab active")
                    console.log("BORAA",iframe)
                    console.log("UAI",caption[0].textContent)
                    modal.style.display = "block";
                    modalImg.src = iframe[0].src;
                    captionText.innerHTML = caption[0].textContent;

                }

            }
            
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }
        
        

        
        // const divs = document.querySelectorAll('.enrollment-info--tabs--tab');

        // divs.forEach(el => el.addEventListener('click', event => {
        // console.log("BLE");
        // }));
        // tab[0].addEventListener("click", function (event) {
        //     console.log("YEY")
        // //   fnSearch(event.target.value.split(" ")[1]);
        // });
    }
  
    fnAddButtons();
    fnDefineEvents();
  })();