import { PhysicsManager } from "./physics/PhysicsManager";
import { ViewManager } from "./display/ViewManager";
import { GameObject } from "./game/GameObject";
import { GameManager } from "./game/GameManager";


let entryPoint = () => {
    let gameManager = new GameManager();
    
    gameManager.entry();

}


entryPoint();
