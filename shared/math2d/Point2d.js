"use strict";
exports.__esModule = true;
var Point2d = (function () {
    function Point2d(x, y) {
        this.x = x;
        this.y = y;
    }
    Point2d.prototype.getLength = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Point2d.prototype.dotProduct = function (p) {
        return p.x * this.x + p.y * this.y;
    };
    Point2d.prototype.crossProduct = function (vec) {
        // Technically, a cross product makes a vector from two vectors
        // but since we're in 2d, I can get away with just returning a number
        // along the z-axis
        var out = this.x * vec.y - this.y * vec.x;
        return out;
    };
    Point2d.prototype.add = function (p) {
        return new Point2d(p.x + this.x, p.y + this.y);
    };
    Point2d.prototype.scale = function (s) {
        return new Point2d(this.x * s, this.y * s);
    };
    Point2d.prototype.getNormalized = function () {
        var length = this.getLength();
        if (length == 0) {
            return new Point2d(0, 0);
        }
        return new Point2d(this.x / length, this.y / length);
    };
    Point2d.prototype.rotate = function (angle) {
        var nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        var ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Point2d(nx, ny);
    };
    Point2d.prototype.clone = function () {
        return new Point2d(this.x, this.y);
    };
    return Point2d;
}());
exports.Point2d = Point2d;
