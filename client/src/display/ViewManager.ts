import { GameObject } from "../game/GameObject";
// import * as $ from 'jquery';

export class ViewManager {
    viewObjects: GameObject[] = [];

    constructor(public containerId:string) {}

    draw() {
        this.viewObjects.map(
            (o) =>  {o.draw($("#" + this.containerId))}
        );
    }
}