// function interceptData() {
//     console.log("ENTROUU 123")
//     var xhrOverrideScript = document.createElement('script');
//     xhrOverrideScript.type = 'text/javascript';
//     xhrOverrideScript.innerHTML = `
//     (function() {
//       var XHR = XMLHttpRequest.prototype;
//       var send = XHR.send;
//       var open = XHR.open;
//       XHR.open = function(method, url) {
//           this.url = url; // the request url
//           return open.apply(this, arguments);
//       }
//       XHR.send = function() {
//           this.addEventListener('load', function() {
//               if (this.url.includes('&next=true')) {
//                 //   console.log(this.response)
//                 try{
//                     if(this.response.key_submission.decision != null){
//                         console.log("Answer: ", this.response.options.find(x => x.pk === this.response.key_submission.decision).text)
    
//                       }else if(this.response.key_submission.decision == null && this.response.key_submission.char){
//                           console.log("Answer: ",this.response.key_submission.char)
//                       }else if(this.response.key_submission.decision == null && this.response.key_submission.integer){
//                         console.log("Answer: ",this.response.key_submission.integer)
//                       }else if(this.response.key_submission.decision == null && this.response.key_submission.rating){
//                         console.log("Answer: ",this.response.key_submission.rating)
//                       }else if(this.response.key_submission.decision == null && this.response.key_submission.course_scores){
//                         console.log("Answer: ",this.response.key_submission.course_scores)
//                       }

//                 }catch(e){
                    
//                 }
                    

                  
//               }               
//           });
//           return send.apply(this, arguments);
//       };
//     })();
//     `
//     document.head.prepend(xhrOverrideScript);
//   }
//   function checkForDOM() {
//     if (document.body && document.head) {
//       interceptData();
//     } else {
//       requestIdleCallback(checkForDOM);
//     }
//   }
//   requestIdleCallback(checkForDOM);
  
  