export class Point2d {
    constructor(public x: number, public y: number) {}

    getLength(): number {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    dotProduct(p: Point2d): number {
        return p.x*this.x + p.y*this.y;
    }

    crossProduct(vec: Point2d): number {
        // Technically, a cross product makes a vector from two vectors
        // but since we're in 2d, I can get away with just returning a number
        // along the z-axis
        let out = this.x*vec.y - this.y*vec.x;
        return out;
    }
    
    add(p: Point2d): Point2d {
        return new Point2d(p.x + this.x, p.y + this.y);
    }

    scale(s: number): Point2d {
        return new Point2d(this.x*s, this.y*s);
    }

    getNormalized() : Point2d {
        let length = this.getLength();
        return new Point2d(this.x / length, this.y/length );
    }
    
    rotate(angle: number): Point2d {
        let nx = this.x*Math.cos(angle) - this.y*Math.sin(angle);
        let ny = this.x*Math.sin(angle) + this.y*Math.cos(angle);
        return new Point2d(nx, ny);
    }
}