"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getLength() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    dotProduct(p) {
        return p.x * this.x + p.y * this.y;
    }
    crossProduct(vec) {
        let out = this.x * vec.y - this.y * vec.x;
        return out;
    }
    add(p) {
        return new Point2d(p.x + this.x, p.y + this.y);
    }
    scale(s) {
        return new Point2d(this.x * s, this.y * s);
    }
    getNormalized() {
        let length = this.getLength();
        if (length == 0) {
            return new Point2d(0, 0);
        }
        return new Point2d(this.x / length, this.y / length);
    }
    clamp(length) {
        let currentLength = this.getLength();
        if (currentLength > length) {
            return this.getNormalized().scale(length);
        }
        else {
            return new Point2d(this.x, this.y);
        }
    }
    rotate(angle) {
        let nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        let ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Point2d(nx, ny);
    }
    clone() {
        return new Point2d(this.x, this.y);
    }
    isEqual(p, fuzz = 0) {
        if (p) {
            return Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2) <= fuzz;
        }
        else {
            console.log("HAVE BLANK p");
            return false;
        }
    }
}
exports.Point2d = Point2d;
//# sourceMappingURL=Point2d.js.map