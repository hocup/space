import { Point2d } from "../../../../shared/math2d/Point2d";

export class BoundingBox {

    get height() : number {
        return this.maxy - this.miny;
    }

    get width() : number {
        return this.maxx - this.minx;
    }

    get cornerPoints() : Point2d[] {
        return [
            new Point2d(this.minx, this.miny),
            new Point2d(this.maxx, this.miny),
            new Point2d(this.maxx, this.maxy),
            new Point2d(this.minx, this.maxy)
        ];
    }

    constructor(public minx: number, public miny: number, public maxx: number, public maxy: number){}

    intersects(o: BoundingBox): boolean {
        let ownPoints = this.cornerPoints;
        
        let otherPoints = o.cornerPoints;

        for(let i = 0; i < ownPoints.length; i++) {
            if(o.pointInside(ownPoints[i])) {
                return true;
            }
        }

        for(let i = 0; i < otherPoints.length; i++){
            if(this.pointInside(otherPoints[i])) {
                return true;
            }
        }
        return false;
    }   
    
    pointInside(p: Point2d) : boolean {
        if(
            p.x - this.minx >= 0 && 
            p.x - this.maxx <= 0 &&
            p.y - this.miny >= 0 &&
            p.y - this.maxy <= 0
        ) {
            return true;
            
        } else {
            return false;
        }
        
    }
}