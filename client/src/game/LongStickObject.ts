import { CompoundCircleGameObject } from "./CompoundCircleGameObject";
import { Point2d } from "../math2d/Point2d";


export class LongStickObject extends CompoundCircleGameObject{
    constructor() {
        let circles: {pos: Point2d, radius: number}[] = [];

        let radius: number = 4;

        for(let i = 0; i < 4; i++) {
            if(i > 0) {
                circles.push({pos: new Point2d(0,i * radius * 1.5), radius: radius});
                circles.push({pos: new Point2d(0,-i * radius * 1.5), radius: radius});
            } else {
                circles.push({pos: new Point2d(0,0), radius: radius});
            }
        }

        super(circles);
    }
}