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
        if(length == 0) {
            return new Point2d(0,0);
        }
        return new Point2d(this.x / length, this.y/length );
    }
    
    // Scale the vector down if it is too long
    clamp(length: number): Point2d {
        let currentLength = this.getLength();
        if(currentLength > length) {
            return this.getNormalized().scale(length);
        } else {
            return new Point2d(this.x, this.y);
        }
    }

    rotate(angle: number): Point2d {
        let nx = this.x*Math.cos(angle) - this.y*Math.sin(angle);
        let ny = this.x*Math.sin(angle) + this.y*Math.cos(angle);
        return new Point2d(nx, ny);
    }

    clone(): Point2d {
        return new Point2d(this.x, this.y);
    }
  
    isEqual(p:Point2d, fuzz: number = 0) {
        if(p) {
            return Math.pow(p.x-this.x, 2) + Math.pow(p.y-this.y,2) <= fuzz;
        } else {
            
            return false;
        }
    }
}
