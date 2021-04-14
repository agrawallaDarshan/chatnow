// Node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('newUserJoined', name =>{ 
        // console.log(`welcome ${name} to chat box`);
        users[socket.id] = name;
        socket.broadcast.emit('userJoined', name);
    });

    //Welcome message for our user
    socket.on('userGreetings' , usergreetingsname =>{
        // console.log("Heyya");
        socket.broadcast.emit('userWelcome',users[socket.id]);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, Username: users[socket.id]})
    });

    //If someone left the chat... Let others know!!
    socket.on('disconnect', leftmessage =>{
        socket.broadcast.emit('leftchat', users[socket.id]);
        delete users[socket.id];
    });


})