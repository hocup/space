import { GameObject } from "../game/GameObject";

export class ViewManager {
    viewObjects: GameObject[] = [];

    constructor(public containerId:string) {}

    draw() {
        this.viewObjects.map(
            (o) =>  {o.draw($("#" + this.containerId))}
        );
    }
}