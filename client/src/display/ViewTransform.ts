import { Point2d } from "../math2d/Point2d";

export class ViewTransform {
    position: Point2d = new Point2d(0,0);
    scale: number = 1;
    rotation: number = 0;

    centerOffset: Point2d = new Point2d(200,200);

    transformPoint(p: Point2d): Point2d {
        //TODO: Deal with scaling and rotation
        // console.log("TRANSFORMING", p, this.position, this.centerOffset);
        return p.add(this.position.scale(-1)).add(this.centerOffset);
    }
}