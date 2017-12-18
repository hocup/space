import { GameObjectDTO } from "../../../shared/GameObjectDTO";
import { GameObject } from "../game/GameObject";
import { PlayerShipObject } from "../game/PlayerShipObject";
import { ObjectType } from "../../../shared/ObjectType";

// Set up the network stuff: establish a con

export class NetworkManager {
    connection: any;

    constructor(){}

    establishConnection(){}

    sendUpdate(){}

    requestUpdate(){}

    static deserializeGameObject(objectData: GameObjectDTO): GameObject {
        let obj: GameObject;
        if(objectData.type = ObjectType.PLAYER_SHIP_OBJECT) {
            let playerObj = new PlayerShipObject();
            playerObj.id = objectData.id;

            obj = playerObj;
        }

        if(obj) {
            obj.id = objectData.id;
        }
        return obj;
    }
}