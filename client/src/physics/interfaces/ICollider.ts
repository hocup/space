import { BoundingBox } from "../classes/BoundingBox";

export interface ICollider {

    getBoundingBox(): BoundingBox;
}