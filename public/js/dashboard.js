var messagefeed= document.getElementById("message-feed")
console.log(messagefeed)
messagefeed.scrollTop =messagefeed.scrollHeight 
const socket = io()
const message = document.getElementById("messageform")
const txt = document.getElementById("typing-box")
message.addEventListener('submit',function(){
    if(txt.value){
        socket.emit("sentmessage",txt.value)
    }
})

socket.on("new message", (msg)=>{
   window.location.reload()  
})
