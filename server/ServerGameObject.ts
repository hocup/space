import { ObjectType } from '../shared/ObjectType';
import { Point2d } from '../shared/math2d/Point2d';

export class ServerGameObject {
    id: string;
    type: ObjectType;

    position: Point2d;
    velocity: Point2d;

    angularPosition: number;
    angularVelocity: number;
}