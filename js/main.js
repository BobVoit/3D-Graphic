window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();



window.onload = function () {
    const WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        CENTER: new Point(0, 0, -30), // центр окошка, через которое видим мир
        CAMERA: new Point(0, 0, -50) // точка, из которой смотрим на мир
    };
    const ZOOM_OUT = 1.1;
    const ZOOM_IN = 0.9;

    const sur = new Surfaces;
    const canvas = new Canvas({ width: 600, height: 600, WINDOW, callbacks: { wheel, mousemove, mouseup, mousedown, mouseleave}});
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({canvas, callbacks: {move}});

    const SCENE = [sur.paraboloid()]; // сцена

    const pointTrue = document.getElementById('pointTrue');
    const lineTrue = document.getElementById('lineTrue');
    const polygonTrue = document.getElementById('polygonTrue');

    let canRotate = false; 

    // about callbacks
    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        SCENE.forEach(subject => subject.points.forEach(point => graph3D.zoom(delta, point)));
    }

    function mouseup() {
        canRotate = false;
    }

    function mouseleave() {
        mouseup();
    }

    function mousedown() {
        canRotate = true;
    }

    function mousemove(event) {
        if (canRotate) {
            if (event.movementX) {
                const alpha = canvas.sx(event.movementX) / WINDOW.CENTER.z;
                SCENE.forEach(subject => subject.points.forEach(point => graph3D.rotateOy(alpha, point)));
            }
            if (event.movementY) {
                const alpha = canvas.sy(event.movementY) / WINDOW.CENTER.z;
                SCENE.forEach(subject => subject.points.forEach(point => graph3D.rotateOx(alpha, point)));
            }    
        }
    }


    function move(direction) {
        if (direction == 'up' || direction == 'down') {
            const delta = (direction === 'up') ? 0.1 : -0.1;
            SCENE.forEach(subject => subject.points.forEach(point => graph3D.moveOy(delta, point)));
        }
        if (direction == 'left' || direction == 'right') {
            const delta = (direction === 'right') ? 0.1 : -0.1;
            SCENE.forEach(subject => subject.points.forEach(point => graph3D.moveOx(delta, point)));
        }
    }

  

    function printSubject(subject) {
        // print polygons
        if (polygonTrue.checked) {
            graph3D.calcDistance(subject, WINDOW.CAMERA);
            subject.polygons.sort((a, b) => b.distance - a.distance)
            for (let i = 0; i < subject.polygons.length; i++) {
                const polygon = subject.polygons[i];
                const point1 = {
                    x: graph3D.xs(subject.points[polygon.points[0]]), 
                    y: graph3D.ys(subject.points[polygon.points[0]])
                };
                const point2 = {
                    x: graph3D.xs(subject.points[polygon.points[1]]), 
                    y: graph3D.ys(subject.points[polygon.points[1]])
                };
                const point3 = {
                    x: graph3D.xs(subject.points[polygon.points[2]]), 
                    y: graph3D.ys(subject.points[polygon.points[2]])
                };
                const point4 = {
                    x: graph3D.xs(subject.points[polygon.points[3]]), 
                    y: graph3D.ys(subject.points[polygon.points[3]])
                };
                canvas.polygon([point1, point2, point3, point4], polygon.color);
            }
        }    
        // print edges
        if (lineTrue.checked) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edges = subject.edges[i];
                const point1 = subject.points[edges.p1];
                const point2 = subject.points[edges.p2];
                canvas.line(graph3D.xs(point1), graph3D.ys(point1), graph3D.xs(point2), graph3D.ys(point2), "#fa03fe");
            }
        }          
        // print points
        if (pointTrue.checked) {
            for (let i = 0; i < subject.points.length; i++) {
                const points = subject.points[i];
                canvas.point(graph3D.xs(points), graph3D.ys(points));
            }
        }    
    }

    function render() {
        canvas.clear();
        SCENE.forEach(subject => printSubject(subject));
        canvas.text(-9, 9, "FPS: " + FPSout);
        
    }

    let FPS = 0;
    let FPSout = 0;
    timestamp = (new Date).getTime();
    (function animloop() {
        // Считаем FPS
        FPS++;
        const currentTimestamp = (new Date).getTime();
        if (currentTimestamp - timestamp >= 1000) {
            timestamp = currentTimestamp;
            FPSout = FPS;
            FPS = 0;

        }

        // рисуем сцену
        render();
        requestAnimFrame(animloop);
    })();
}; 