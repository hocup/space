import { GameObjectDTO } from "../../../shared/GameObjectDTO";
import { GameObject } from "../game/GameObject";
import { PlayerShipObject } from "../game/PlayerShipObject";
import { ObjectType } from "../../../shared/ObjectType";
import { NetworkMessageStrings } from "../../../shared/NetworkMessageStrings";
import { CirclePhysicsObject } from "../physics/classes/CirclePhysicsObject";
import { Point2d } from "../../../shared/math2d/Point2d";
import { CompoundCircleGameObject } from "../game/CompoundCircleGameObject";
import { EventEmitter } from "../game/EventEmitter";

// Set up the network stuff: establish a con

export class NetworkManager {
    connection: SocketIOClient.Socket;

    serverObjectsStateUpdate: EventEmitter<GameObject[]> = new EventEmitter<GameObject[]>();

    constructor(){}

    establishConnection() {
        this.connection = io.connect();

        // this.connection.on('news', (data: any) => {
        //     console.log(data);
        //     this.connection.emit('my other event', { my: 'COOL NEW DATA' });
        // });

        this.connection.on(
            NetworkMessageStrings.serverObjectStateUpdate, (data: {[key: string] : GameObjectDTO}) => {
                let objArray: GameObjectDTO[] = [];
                for(let k in data) {
                    objArray.push(data[k]);
                }

                //TODO: Handle issues with deserializing objects better
                let gameObjects: GameObject[] = objArray.map(NetworkManager.deserializeGameObject).filter(o => o != null);
                this.serverObjectsStateUpdate.emit(gameObjects);
            }
        );
    }

    sendUpdate(objects: GameObject[]){
        let serializedObjects: GameObjectDTO[] = objects.map(NetworkManager.serializeGameObject);
        this.connection.emit(NetworkMessageStrings.clientObjectStateUpdate, serializedObjects);
    }

    // requestUpdate(){}

    requestInitialState() {
        return new Promise(
            (resolve, reject) => {
                // console.log("Requesting initial data", NetworkMessageStrings.clientInitRequest);

                //TODO: send over user information
                this.connection.emit(NetworkMessageStrings.clientInitRequest, {user: "todo"});

                //TODO: Handle network errors
                this.connection.on(NetworkMessageStrings.clientInitResponse,
                    (objects: {[key: string] : GameObjectDTO}) => {
                        let objectsArray: GameObjectDTO[] = [];
                        for(let k in objects) {
                            objectsArray.push(objects[k])
                        }
                        
                        let gameObjects: GameObject[] = objectsArray.map(NetworkManager.deserializeGameObject);

                        this.connection.off(NetworkMessageStrings.clientInitResponse);

                        resolve(gameObjects);
                    }
                );
            }
        );
    }

    addObject(go: GameObject) {
        let dto = NetworkManager.serializeGameObject(go);
        this.connection.emit(NetworkMessageStrings.clientObjectsAdded, [dto]);
    }

    static serializeGameObject(object: GameObject): GameObjectDTO {
        let out = new GameObjectDTO();
        // TODO: reconsider sending the whole object
        out.id = object.id;
        out.type = object.objectType;
        out.position = object.physicsObject.position;
        out.velocity = object.physicsObject.velocity;
        out.angularPosition = object.physicsObject.angularPosition;
        out.angularVelocity = object.physicsObject.angularVelocity;

        return out;
    }

    static deserializeGameObject(objectData: GameObjectDTO): GameObject {
        
        let obj: GameObject;
        switch(objectData.type) {
            case ObjectType.PLAYER_SHIP_OBJECT:
                let playerObj = new PlayerShipObject();
                playerObj.id = objectData.id;
                playerObj.physicsObject.angularPosition = objectData.angularPosition ? objectData.angularPosition : 0;
                playerObj.physicsObject.angularVelocity = objectData.angularVelocity ? objectData.angularVelocity : 0;
                playerObj.physicsObject.position = new Point2d(objectData.position.x, objectData.position.y);
                playerObj.physicsObject.velocity = new Point2d(objectData.velocity.x, objectData.velocity.y);

                obj = playerObj;
                break;
            case ObjectType.BORING_CIRCLE_OBJECT:
                let circleObj = new GameObject(objectData.id);
                circleObj.physicsObject = new CirclePhysicsObject();
                circleObj.physicsObject.angularPosition = objectData.angularPosition ? objectData.angularPosition : 0;
                circleObj.physicsObject.angularVelocity = objectData.angularVelocity ? objectData.angularVelocity : 0;
                circleObj.physicsObject.position = new Point2d(objectData.position.x, objectData.position.y);
                circleObj.physicsObject.velocity = new Point2d(objectData.velocity.x, objectData.velocity.y);
                circleObj.physicsObject.mass = objectData.mass;

                obj = circleObj;
                break;

        }

        if(obj) {
            obj.id = objectData.id;
        } else {
            // console.log("Deserialization issue", objectData);
        }

        return obj;
    }
}