import { Point2d } from "../math2d/Point2d";
import { CompoundCircleGameObject } from "./CompoundCircleGameObject";


export class SeedObject extends CompoundCircleGameObject{
    constructor() {
        let circleDefs = [
            {pos: new Point2d(0,0), radius: 7},
            {pos: new Point2d(0,7), radius: 5},
            {pos: new Point2d(0,-7), radius: 5}
        ];

        super(circleDefs);
    }
}