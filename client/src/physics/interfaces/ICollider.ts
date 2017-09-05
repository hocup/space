import { BoundingBox } from "../classes/BoundingBox";
import { ColliderTypes } from "../classes/ColliderTypes";

export interface ICollider {
    type: ColliderTypes;

    getBoundingBox(): BoundingBox;
}