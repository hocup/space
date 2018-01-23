"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point2d_1 = require("../shared/math2d/Point2d");
const NetworkMessageStrings_1 = require("../shared/NetworkMessageStrings");
const ObjectType_1 = require("../shared/ObjectType");
const ServerGameObject_1 = require("./ServerGameObject");
const timers_1 = require("timers");
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
server.listen(3010);
let clients = [];
app.use('/', express.static('../client'));
io.on('connection', function (socket) {
    let newPt = new Point2d_1.Point2d(0, 0);
    socket.emit('news', { hello: 'world', pt: objects });
    socket.on('my other event', function (data) {
        console.log(data);
    });
    console.log(NetworkMessageStrings_1.NetworkMessageStrings.clientInitRequest);
    socket.on(NetworkMessageStrings_1.NetworkMessageStrings.clientInitRequest, (data) => {
        console.log("Have a initializaton request", data);
        socket.emit(NetworkMessageStrings_1.NetworkMessageStrings.clientInitResponse, objects);
    });
    socket.on(NetworkMessageStrings_1.NetworkMessageStrings.clientObjectStateUpdate, (data) => {
        console.log("Got an update from a client", data.length);
        data.map((objectUpdate) => {
            if (objects[objectUpdate.id]) {
                objects[objectUpdate.id].position.x = objectUpdate.position.x;
                objects[objectUpdate.id].position.y = objectUpdate.position.y;
                objects[objectUpdate.id].velocity.x = objectUpdate.velocity.x;
                objects[objectUpdate.id].velocity.y = objectUpdate.velocity.y;
            }
        });
    });
    socket.on(NetworkMessageStrings_1.NetworkMessageStrings.clientObjectsAdded, (data) => {
        console.log("Got a set of new objects from a client", data.length);
        data.map((godto) => {
            let newObj = new ServerGameObject_1.ServerGameObject();
            newObj.type = godto.type;
            newObj.id = godto.id;
            newObj.position = new Point2d_1.Point2d(godto.position.x, godto.position.y);
            newObj.velocity = new Point2d_1.Point2d(godto.velocity.x, godto.velocity.y);
            newObj.angularPosition = godto.angularPosition;
            newObj.angularVelocity = godto.angularVelocity;
            this.objects[newObj.id] = newObj;
        });
    });
    clients.push(socket);
});
let objects = {};
for (let i = 0; i < 100; i++) {
    let obj = new ServerGameObject_1.ServerGameObject();
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i < 10; i++) {
        obj.id += alphabet.substr(Math.floor(Math.random() * alphabet.length), 1);
    }
    obj.type = ObjectType_1.ObjectType.BORING_CIRCLE_OBJECT;
    obj.mass = 400;
    obj.position = new Point2d_1.Point2d(Math.random() * 600, Math.random() * 600);
    objects[obj.id] = obj;
}
timers_1.setInterval(() => {
    clients.forEach((sock) => {
        sock.emit(NetworkMessageStrings_1.NetworkMessageStrings.serverObjectStateUpdate, objects);
    });
}, 700);
//# sourceMappingURL=index.js.map