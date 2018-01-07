"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point2d_1 = require("../shared/math2d/Point2d");
class ServerGameObject {
    constructor() {
        this.id = "";
        this.position = new Point2d_1.Point2d(0, 0);
        this.velocity = new Point2d_1.Point2d(0, 0);
        this.angularPosition = 0;
        this.angularVelocity = 0;
    }
}
exports.ServerGameObject = ServerGameObject;
//# sourceMappingURL=ServerGameObject.js.map