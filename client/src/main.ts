import { PhysicsManager } from "./physics/PhysicsManager";
import { ViewManager } from "./display/ViewManager";
import { GameObject } from "./game/GameObject";
import { CircleObject } from "./physics/classes/CircleObject";
import { GameManager } from "./game/GameManager";

console.log("This is the main file!");

let entryPoint = () => {
    let gameManager = new GameManager();
    
    gameManager.entry();
}


entryPoint();
