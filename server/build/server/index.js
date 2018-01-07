"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point2d_1 = require("../shared/math2d/Point2d");
const ServerGameObject_1 = require("./ServerGameObject");
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
server.listen(3010);
app.use('/', express.static('../client'));
io.on('connection', function (socket) {
    let newPt = new Point2d_1.Point2d(0, 0);
    socket.emit('news', { hello: 'world', pt: objects });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
let objects = [];
for (let i = 0; i < 100; i++) {
    let obj = new ServerGameObject_1.ServerGameObject();
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i < 10; i++) {
        obj.id += alphabet.substr(Math.floor(Math.random() * alphabet.length), 1);
    }
    objects.push(obj);
}
//# sourceMappingURL=index.js.map