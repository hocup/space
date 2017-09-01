export class BoundingBox {

    get height() : number {
        return this.maxy - this.miny;
    }

    get width() : number {
        return this.maxx - this.minx;
    }
    constructor(public minx: number, public miny: number, public maxx: number, public maxy: number){}

    
}