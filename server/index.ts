import { Request, Response } from "express-serve-static-core";
import { Point2d } from "../shared/math2d/Point2d";
import { NetworkMessageStrings } from "../shared/NetworkMessageStrings";
import { ObjectType } from "../shared/ObjectType";
import { GameObjectDTO } from '../shared/GameObjectDTO';

import { ServerGameObject } from "./ServerGameObject";
import { setInterval } from "timers";

let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(3010);

let clients: SocketIO.Socket[] = [];

// Set up express
//TODO: Make this only serve the files needed
app.use('/', express.static('../client'));

io.on('connection', function (socket: SocketIO.Socket) {
    let newPt = new Point2d(0,0);
    // socket.emit('news', { hello: 'world', pt: objects });
    // socket.on('my other event', function (data: any) {
    //     console.log(data);
    // });

    socket.on(NetworkMessageStrings.clientInitRequest, (data: any) => {
        // console.log("Have a initializaton request", data);
        socket.emit(NetworkMessageStrings.clientInitResponse, objects);
    });

    socket.on(NetworkMessageStrings.clientObjectStateUpdate, (data: GameObjectDTO[]) => {
        // console.log("Got an update from a client", data.length);
        data.map(
            (objectUpdate: GameObjectDTO) => {
                if(objects[objectUpdate.id]) {
                    
                    objects[objectUpdate.id].position.x = objectUpdate.position.x;
                    objects[objectUpdate.id].position.y = objectUpdate.position.y;

                    objects[objectUpdate.id].velocity.x = objectUpdate.velocity.x;
                    objects[objectUpdate.id].velocity.y = objectUpdate.velocity.y;

                    objects[objectUpdate.id].angularPosition = objectUpdate.angularPosition;
                    objects[objectUpdate.id].angularVelocity = objectUpdate.angularVelocity;
                }
            }
        );

    });

    socket.on(NetworkMessageStrings.clientObjectsAdded, (data: GameObjectDTO[]) => {
        
        data.map(
            (godto: GameObjectDTO) => {
                //TODO: This should probably be handled elsewhere. 
                let newObj: ServerGameObject = new ServerGameObject();

                newObj.type = godto.type;
                newObj.id = godto.id;
                newObj.position = new Point2d(godto.position.x, godto.position.y);
                newObj.velocity = new Point2d(godto.velocity.x, godto.velocity.y);
                newObj.angularPosition = godto.angularPosition;
                newObj.angularVelocity = godto.angularVelocity;

                //TODO: Confirm that this object id isn't already used
                objects[newObj.id] = newObj;
            }
        )
    });

    clients.push(socket);
});

// Set up some state managment code
let objects: {[key: string] : ServerGameObject} = {};

for(let i = 0; i < 10; i++) {
    let obj = new ServerGameObject();

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    for(let i = 0; i < 10; i++) {
        obj.id += alphabet.substr(Math.floor(Math.random()*alphabet.length), 1);
    }

    obj.type = ObjectType.BORING_CIRCLE_OBJECT;
    obj.mass = 400;

    obj.position = new Point2d(Math.random()*600, Math.random()*600);

    objects[obj.id] = obj;
}

setInterval(() => {
    clients.forEach(
        (sock: SocketIO.Socket) => {
            sock.emit(NetworkMessageStrings.serverObjectStateUpdate, objects);
        }
    );
}, 700);