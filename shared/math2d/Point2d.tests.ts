import * as assert from "assert";
import * as Mocha from "mocha";
import { Point2d } from "./Point2d";


describe("Point2d", function() {
    describe("constructor", function() {
        let xVal = 3;
        let yVal = 26;
        let newPoint2d = new Point2d(xVal,yVal);

        it("Creates a new point2d, with x value passed in", function() {
            assert.equal(newPoint2d.x, xVal);
        });
        
        it("Creates a new point2d, with y value passed in", function() {
            assert.equal(newPoint2d.y, yVal);
        });

        it("Created a new Point2d with x and y values that are independant of the original variables", function() {
            // This is a bit of a silly test, isn't it
            let testX = xVal;
            let testY = yVal;
            xVal = 2;
            yVal = 3;

            assert.ok(newPoint2d.x != xVal && newPoint2d.y != yVal);
        });
    });

    describe("getLength()", function(){
        it("handles vectors with only an x component", function() {
            let tp = new Point2d(2,0);
            assert.equal(tp.getLength(), 2);
        });

        it("handles vectors with only a y component", function() {
            let tp = new Point2d(0,2);
            assert.equal(tp.getLength(), 2);
        });

        it("handles vectors with both components", function() {
            let tp = new Point2d(3,4);
            assert.equal(tp.getLength(), 5);
        });

        it("handles zero-length vectors", function() {
            let tp = new Point2d(0,0);
            assert.equal(tp.getLength(), 0);
        });
    });

    describe("dotProduct()", function() {
        // it("creates a n", function() {
        //     let tA = new Point2d(23,45);
        //     let tB = new Point2d(2,4);
        //     let tC = tA.dotProduct(tB);

        //     tA.x = 2;
        //     assert.ok(tC.x != tA.x)
        // });

        it("commutes", function() {
            let pA = new Point2d(Math.random(), Math.random());
            let pB = new Point2d(Math.random(), Math.random());

            assert.ok(pA.dotProduct(pB) == pB.dotProduct(pA));
        })

        it("handles parallel vectors", function(){
            let pA = new Point2d(1,0);
            let pB = new Point2d(5,0);

            assert.equal(pA.dotProduct(pB), 5);
        });
    });

    describe("crossProduct()", function(){
        it("anti-commutes", function() {
            let pA = new Point2d(Math.random(), Math.random());
            let pB = new Point2d(Math.random(), Math.random());

            assert.equal(-pA.crossProduct(pB), pB.crossProduct(pA));
        });
    });

    describe("isEqual()", function(){
        it("returns true when comparing exactly equal vectors with no fuzz",
            function() {
                let pA = new Point2d(Math.random(), Math.random());
                let pB = pA.clone();
                assert.ok(pA.isEqual(pB));
            }
        );

        it("returns false when comparing nearly equal vectors with no fuzz",
            function() {
                let pA = new Point2d(Math.random(), Math.random());
                let pB = pA.clone();
                pB = pB.scale(0.99);
                assert.ok(!pA.isEqual(pB));
            }
        );

        it("returns true when comparing nearly equal vectors with sufficient fuzz",
            function() {
                let pA = new Point2d(Math.random(), Math.random());
                let pB = pA.clone();
                pB = pB.scale(0.99);
                assert.ok(pA.isEqual(pB, 0.01));
            }
        );
    });
});
