const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let destarea = document.querySelector('#destno')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
    console.log(destarea.value)
})

function sendMessage(message) {
    let msg = {
        to: destarea.value,
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup
    if(type==='outgoing'){
        markup = `
        <h4>${msg.user} --> ${msg.to}</h4>
        <p>${msg.message}</p>
        `
    }
    else{
        markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
    }

    // let markup = `
    //     <h4>${msg.user}</h4>
    //     <p>${msg.message}</p>
    // `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

socket.emit('join', {name}, (error) => {
    if(error) {
        alert(error)
        location.href="/"
    }
})