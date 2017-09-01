import { GameObject } from "../game/GameObject";
import { Point2d } from "../math2d/Point2d";
import { ViewTransform } from "./ViewTransform";
// import * as $ from 'jquery';

export class ViewManager {
    transform: ViewTransform = new ViewTransform();

    viewObjects: GameObject[] = [];

    constructor(public containerId:string) {
        console.log(this.containerId);
    }

    
    draw() {
        
        this.viewObjects.map(
            (o) =>  {o.draw($("#" + this.containerId), this.transform)}
        );
    }
}