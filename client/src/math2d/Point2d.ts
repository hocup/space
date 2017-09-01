export class Point2d {
    constructor(public x: number, public y: number) {}

    getLength(): number {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    dotProduct(p: Point2d): number {
        return p.x*this.x + p.y*this.y;
    }

    //TODO: Cross product?
    
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
    
}