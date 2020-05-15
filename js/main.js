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
    const canvas = new Canvas({ width: 700, 
        height: 700, 
        WINDOW, 
        callbacks: { wheel, mousemove, mouseup, mousedown, mouseleave}}
        );
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({canvas, callbacks: {move, printPoints, printEdges, printPolygons}});
    // сцена 
    const SCENE = [ //sur.twoHyperbolid()
        // Мики Маус
        // sur.sphera(20, 3, new Point(-6, 0, -6), "#00ffff"),
        // sur.sphera(20, 3, new Point(6, 0, -6), "#ff00ff" ),
        // sur.sphera(20, 6, new Point(0, 0, 0), "#ffff00", { rotateOz: new Point }),
        // sur.sphera(20, 1, new Point(3, -5.5, -2), "#ff0000"),
        // sur.sphera(20, 1, new Point(-3, -5.5, -2), "#ff0000"),
        // sur.sphera(20, 1, new Point(0, -6, 0), "#00ff00"),

        // Солнечная система

        sur.sphera(20, 10, new Point(0, 0, 0), "#ffff00", { rotateOz: new Point }), //солнце 0
        sur.sphera(20, 3, new Point(20, 0, 0), "#f74b0e", { rotateOz: new Point(20, 0, 0),
            rotateOz: new Point(0, 0, 0) }), // меркурий 1
        sur.sphera(20, 4, new Point(-40, 0, 0), "#6a738b", { rotateOz: new Point}), // венера 2
        sur.sphera(20, 4.4, new Point(0, 60, 0), "#2e3dfe", { rotateOz: new Point}), // земля 3
        sur.sphera(20, 1, new Point(0, 53, 0), "#537d79", { rotateOz: new Point(0, 60, 0)
            }), // луна 4
        sur.sphera(20, 3.6, new Point(0, -80, 0), "#fa0100", { rotateOz: new Point}), // марс 5
        sur.sphera(20, 8, new Point(0, -120, 0), "#fc5300", { rotateOz: new Point}), // юпитер 6
        sur.sphera(20, 7, new Point(150, 0, 0), "#e4cf00", { rotateOz: new Point}), // сатурн 7 
        sur.bublik(20, 14, new Point(150, 0, 0), "#a48200", { rotateOz: new Point}), // кольцо сатурна 8
        sur.sphera(20, 5.5, new Point(0, 180, 0), "#86aeff", { rotateOz: new Point}), // уран 9
        sur.bublik(20, 12, new Point(0, 180, 0), "#86c5ff", { rotateOz: new Point}), // кольцо урана 10
        sur.sphera(20, 5.3, new Point(-170, 0, 0), "#0263c5", { rotateOz: new Point}), // нептут 11
        
    ]; 

    // const SCENE_2 = [
    //     sur.sphera(
    //         20,
    //         1, 
    //         new Point(24, 0, 0), 
    //         "#ff0000", 
    //         {  rotateOz: new Point(20, 0, 0)}),
    // ];

    // const SCENE = SCENE_1.concat(SCENE_2);

    const LIGHT = new Light(-20, 2, -20, 700); // источник света

    let canRotate = false; 
    let canPrint = {
        points: false,
        edges: false,
        polygons: true
    }

    // about callbacks
    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        SCENE.forEach(subject => {
            subject.points.forEach(point => graph3D.zoom(delta, point));
            if (subject.animation ) {
                for (let key in subject.animation) {
                    graph3D.zoom(delta, subject.animation[key]);
                }
                
            }
        });
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
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.rotateOy(alpha, point));
                    if (subject.animation ) {
                        for (let key in subject.animation) {
                            graph3D.rotateOy(alpha, subject.animation[key]);
                        }
                        
                    }       
                })
            }    
            if (event.movementY) {
                const alpha = canvas.sy(event.movementY) / WINDOW.CENTER.z;
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.rotateOx(alpha, point));                      
                    if (subject.animation) {
                        for (let key in subject.animation) {
                            graph3D.rotateOx(alpha, subject.animation[key]);
                        }                      
                    }
                });
            }    
        }
    };

    function printPoints(value) {
        canPrint.points = value;
    };

    function printEdges(value) {
        canPrint.edges = value;
    }

    function printPolygons(value) {
        canPrint.polygons = value;
    };


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


    function printAllPolygons(){
        // print polygons
        if (canPrint.polygons) {

            const polygons = [];

            SCENE.forEach(subject => {
                // Отсечь невидимые грани
                //graph3D.calcGorner(subject, WINDOW.CAMERA);

                // алгоритм художника
                graph3D.calcDistance(subject, WINDOW.CAMERA, 'distance');
                subject.polygons.sort((a, b) => b.distance - a.distance);
                graph3D.calcDistance(subject, LIGHT, 'lumen');
                // отрисовка полигонов
                for (let i = 0; i < subject.polygons.length; i++) {
                    if (subject.polygons[i].visible) {
                        const polygon = subject.polygons[i];
                        const point1 = {x: graph3D.xs(subject.points[polygon.points[0]]), y: graph3D.ys(subject.points[polygon.points[0]])};
                        const point2 = {x: graph3D.xs(subject.points[polygon.points[1]]), y: graph3D.ys(subject.points[polygon.points[1]])};
                        const point3 = {x: graph3D.xs(subject.points[polygon.points[2]]), y: graph3D.ys(subject.points[polygon.points[2]])};
                        const point4 = {x: graph3D.xs(subject.points[polygon.points[3]]), y: graph3D.ys(subject.points[polygon.points[3]])};
                        let {r, g, b} = polygon.color;
                        const lumen = graph3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                        r = Math.round(r * lumen);
                        g = Math.round(g * lumen);
                        b = Math.round(b * lumen);
                        polygons.push({
                            points: [point1, point2, point3, point4],
                            color: polygon.rgbToHex(r, g, b),
                            distance: polygon.distance
                        });
                    }
                }
            });
            // отрисовка всех полигонов
            polygons.sort((a, b) => b.distance - a.distance);
            polygons.forEach(polygon => canvas.polygon(polygon.points, polygon.color));
        }
    }

  

    function printSubject(subject) {
        
                   
        // print edges
        if (canPrint.edges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edges = subject.edges[i];
                const point1 = subject.points[edges.p1];
                const point2 = subject.points[edges.p2];
                canvas.line(graph3D.xs(point1), graph3D.ys(point1), graph3D.xs(point2), graph3D.ys(point2), "#66f400");
            }
        }          
        // print points
        if (canPrint.points) {
            for (let i = 0; i < subject.points.length; i++) {
                const points = subject.points[i];
                canvas.point(graph3D.xs(points), graph3D.ys(points));
            }
        }    
    }


    // function animationMoon(subject, center) {
    //     subject.animation.rotateOz.x = center.x;
    //     subject.animation.rotateOz.y = center.y;
    //     subject.animation.rotateOz.z = center.z;
    //     return subject;
    // }
    
    function render() {
        canvas.clear();
        //SCENE[4] = animationMoon(SCENE[4], SCENE[3].points[SCENE[3].points.length - 1])
        printAllPolygons();
        SCENE.forEach(subject => printSubject(subject));
        canvas.text(-9, 9, "FPS: " + FPSout);  

    }

    function animation() {
        // Закрутим фигуру!!!
        SCENE.forEach(subject => {
            if (subject.animation) {
                for (let key in subject.animation) {                  
                    const { x, y, z } = subject.animation[key];
                    const xn = WINDOW.CENTER.x - x;
                    const yn = WINDOW.CENTER.y - y;
                    const zn = WINDOW.CENTER.z - z;
                    // переместить центр объекта в центр координат
                    subject.points.forEach(point => graph3D.move(xn, yn, zn, point));
                    // повращать объект
                    const alpha = Math.PI / 180;
                    subject.points.forEach(point => graph3D[key](alpha, point));
                    //переместить центр объекта после вращения обратно
                    subject.points.forEach(point => graph3D.move(-xn, -yn, -zn, point));
                }
            }            
        });
    }

    setInterval(animation, 10);

    //clearInterval(interval);


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