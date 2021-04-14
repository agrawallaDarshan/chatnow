const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('sendMessage');
const messageInput = document.getElementById('messageInput');
const nameContainer = document.querySelector(".nameContainer");
const messageContainer = document.querySelector(".container");
var audioReceive = new Audio('receive.mp3');
var audioSend = new Audio('send.mp3');

const append = (message,position)=>{
    const newElement = document.createElement('div');
    newElement.innerText = message;
    newElement.classList.add('message');
    newElement.classList.add(position);
    messageContainer.append(newElement);
    if(position == 'left')
    {
        audioReceive.play();
    }
    else if(position == 'right')
    {
        audioSend.play();
    }
   
    
};

const welcome = (message)=>{
    const newelement = document.createElement('div');
    newelement.innerText = message;
    nameContainer.append(newelement);
};

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevents relaoding
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})
//Ask new user for his/her name and let the server know
const username = prompt("Enter your name to join");
welcome(`Hello ${username}!!.. Welcome to your chat box`);

socket.emit('newUserJoined', username);

socket.on('userJoined',name=>{
    append(`${name} joined the chat`,'center');
});

socket.on('userWelcome' , namedata=>{
    // welcome(`Hello ${namedata}!!.. Welcome to chat box`);
});

socket.on('receive', messageData =>{
    append(`${messageData.Username}: ${messageData.message}`,'left');
})

socket.on('leftchat', leftusername =>{
    append(`${leftusername} left the chat`,'center');
});

