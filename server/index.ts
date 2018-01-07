import { Request, Response } from "express-serve-static-core";
import { Point2d } from "../shared/math2d/Point2d";
import { ServerGameObject } from "./ServerGameObject";

let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(3010);

// Set up express
//TODO: Make this only serve the files needed
app.use('/', express.static('../client'));

io.on('connection', function (socket: SocketIO.Socket) {
    let newPt = new Point2d(0,0);
    socket.emit('news', { hello: 'world', pt: objects });
    socket.on('my other event', function (data: any) {
        console.log(data);
    });
});


// Set up some state managment code
let objects: ServerGameObject[] = [];
for(let i = 0; i < 100; i++) {
    let obj = new ServerGameObject();

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    for(let i = 0; i < 10; i++) {
        obj.id += alphabet.substr(Math.floor(Math.random()*alphabet.length), 1);
    }

    objects.push(obj);
}
    // Create the initial setup or load it from DB

// Set up socket stuff to recieve and process updates from the clients