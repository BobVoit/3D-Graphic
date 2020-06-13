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
        P1: new Point(-10,  10, -30), // левый верхний угол
        P2: new Point(-10, -10, -30), // левый нижний угол
        P3: new Point( 10, -10, -30), // правый нижний угол
        CENTER: new Point(0, 0, -30), // центр окошка, через которое видим мир -30
        CAMERA: new Point(0, 0, -50) // точка, из которой смотрим на мир
    };
    // получаем


    const ZOOM_OUT = 1.1;
    const ZOOM_IN = 0.9;

    const sur = new Surfaces;
    const canvas = new Canvas({
        id: 'canvas',
        width: 600,
        height: 600,
        WINDOW,
        callbacks: { wheel, mousemove, mouseup, mousedown, mouseleave}}
        );
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({callbacks: {move, printPoints, printEdges, printPolygons,
            printFigures
        }});


    // сцена
    const SCENE = [];

    const LIGHT = new Light(10, 2, 100, 8000); // источник света

    let canRotate = false;
    let canPrint = {
        points: false,
        edges: false,
        polygons: true
    }

    // about callbacks
    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        graph3D.zoomMatrix(delta);
        SCENE.forEach(subject => {
            subject.points.forEach(point => graph3D.transform(point));
            if (subject.animation) {
                for (let key in subject.animation) {
                    graph3D.transform(subject.animation[key]);
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
            if (event.movementX) {// крутить вокруг OY
                const alpha =  canvas.sx(event.movementX) / 10;
                graph3D.rotateOxMatrix(alpha);
                graph3D.transform(WINDOW.CAMERA);
                graph3D.transform(WINDOW.CENTER);
                graph3D.transform(WINDOW.P1);
                graph3D.transform(WINDOW.P2);
                graph3D.transform(WINDOW.P3);

            }
            if (event.movementY) {// крутить вокруг OX
                const alpha = canvas.sy(event.movementY) / 10;
                graph3D.rotateOyMatrix(alpha);
                graph3D.transform(WINDOW.CAMERA);
                graph3D.transform(WINDOW.CENTER);
                graph3D.transform(WINDOW.P1);
                graph3D.transform(WINDOW.P2);
                graph3D.transform(WINDOW.P3);
            }
        }
    };

    // рисование фигур
    function printFigures(value) {
        while (SCENE.length !== 0) {
            SCENE.pop();
        }
        switch(value) {
            case "cube":
                SCENE.push(sur.cube());
                break;
            case "bublik":
                SCENE.push(sur.bublik());
                break;
            case "hyperCylinder":
                SCENE.push(sur.hyperCylinder());
                break;
            case "parabCylinder":
                SCENE.push(sur.parabCylinder());
                break;
            case "ellipscylinder":
                SCENE.push(sur.ellipscylinder());
                break;
            case "oneHyperbolid":
                SCENE.push(sur.oneHyperbolid());
                break;
            case "twoHyperbolid":
                SCENE.push(sur.twoHyperbolid());
                break;
            case "ellipsoid":
                SCENE.push(sur.ellipsoid());
                break;
            case "cone":
                SCENE.push(sur.cone());
                break;
            case "sphera":
                SCENE.push(sur.sphera());
                break;
            case "ellipsParaboloid":
                SCENE.push(sur.ellipsParaboloid());
                break;
            case "hyperbolicParaboloid":
                SCENE.push(sur.hyperbolicParaboloid());
                break;
            case "sunSystem":
                SCENE.push(sur.sphera(20, 10, new Point(0, 0, 0), "#ffff00", {}), //солнце 0
                    sur.sphera(20, 3, new Point(10, Math.sqrt(400 - 100), 0), "#f74b0e",
                        { rotateOz: new Point}), // меркурий 1
                    sur.sphera(20, 4, new Point(-23, Math.sqrt(1600 - 23 * 23), 0), "#6a738b",
                        { rotateOz: new Point}), // венера 2
                    sur.sphera(20, 4.4, new Point(0, 60, 0), "#2e3dfe", { rotateOz: new Point}), // земля 3
                    //sur.sphera(20, 1, new Point(0, 53, 0), "#537d79",
                    //    { rotateOz: new Point()}), // луна 4
                    sur.sphera(20, 3.6, new Point(-Math.sqrt(6400 - 32 * 32), -32, 0), "#fa0100", { rotateOz: new Point}), // марс 5
                    sur.sphera(20, 8, new Point(Math.sqrt(120 * 120 - 110 * 110), -110, 0), "#fc5300", { rotateOz: new Point}), // юпитер 6
                    sur.sphera(20, 7, new Point(150, 0, 0), "#e4cf00", { rotateOz: new Point}), // сатурн 7
                    sur.bublik(20, 14, new Point(150, 0, 0), "#a48200", { rotateOz: new Point}), // кольцо сатурна 8
                    sur.sphera(20, 5.5, new Point(0, 180, 0), "#86aeff", { rotateOz: new Point}), // уран 9
                    sur.bublik(20, 12, new Point(0, 180, 0), "#86c5ff", { rotateOz: new Point}), // кольцо урана 10
                    sur.sphera(20, 5.3, new Point(-Math.sqrt(200 * 200 - 70 * 70), 70, 0), "#0263c5", { rotateOz: new Point}), // нептут 11
                );
                break;
            case "mouses":
                SCENE.push(sur.sphera(20, 6, new Point(0, 0, 0), "#ffff00", { }),
                    sur.sphera(20, 3, new Point(-6, -5, -6), "#00ffff",  { rotateOx: new Point}),
                    sur.sphera(20, 3, new Point(6, 0, -6), "#ff00ff" ),
                    sur.sphera(20, 1, new Point(3, -5.5, -2), "#ff0000"),
                    sur.sphera(20, 1, new Point(-3, -5.5, -2), "#ff0000"),
                    sur.sphera(20, 1, new Point(0, -6, 0), "#00ff00"),
                );
                break;
            case "twoSphere":
                SCENE.push(sur.sphera(30, 10, new Point(0, 0, 0), "#ffff00", {}),
                    sur.sphera(20, 3, new Point(13, 0, 10), "#f74b0e",
                        { rotateOz: new Point})
                );
                break;
            case "watermelon":
                SCENE.push(sur.watermelon());
                break;   
            case "mixColorSphere":
                SCENE.push(sur.mixColorSphere());
                break;      
            default: break;
        }
    }

    // получение информации, о рисование фигур
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
        switch(direction) {
            case 'up': graph3D.rotateOyMatrix(Math.PI / 180); break;
            case 'down': graph3D.rotateOyMatrix(-Math.PI / 180); break;
            case 'left': graph3D.rotateOxMatrix(Math.PI / 180); break;
            case 'right': graph3D.rotateOxMatrix(-Math.PI / 180); break;
        }
        graph3D.transform(WINDOW.CAMERA);
        graph3D.transform(WINDOW.CENTER);
        graph3D.transform(WINDOW.P1);
        graph3D.transform(WINDOW.P2);
        graph3D.transform(WINDOW.P3);
    }


    function printAllPolygons(){
        // print polygons
        if (canPrint.polygons) {
            // набрать полигоны в кучу
            const polygons = [];
            // предварительные расчеты
            SCENE.forEach(subject => {
                // алгоритм художника
                //graph3D.calcGorner(subject, WINDOW.CAMERA); // Отсечь невидимые грани
                graph3D.calcDistance(subject, WINDOW.CAMERA, 'distance'); // записать дистанции
                graph3D.calcCenters(subject); // найти центры всех полигонов
                //subject.polygons.sort((a, b) => b.distance - a.distance);
                graph3D.calcDistance(subject, LIGHT, 'lumen');
            });
            // расчет освещенности полигонов и его проекции на экран
            SCENE.forEach(subject => {
                // отрисовка полигонов
                for (let i = 0; i < subject.polygons.length; i++) {
                    //отрисовка полигонов
                    if (subject.polygons[i].visible) {
                        const polygon = subject.polygons[i];
                        const point1 = graph3D.getProection(subject.points[polygon.points[0]]);
                        const point2 = graph3D.getProection(subject.points[polygon.points[1]]);
                        const point3 = graph3D.getProection(subject.points[polygon.points[2]]);
                        const point4 = graph3D.getProection(subject.points[polygon.points[3]]);
                        let {r, g, b} = polygon.color;
                        const { isShadow, dark } = graph3D.calcShadow(polygon, subject, SCENE, LIGHT);
                        const lumen = (isShadow) ? dark : graph3D.calcIllumination(polygon.lumen, LIGHT.lumen);
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
        // нарисовать рёбра
        if (canPrint.edges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const point1 = graph3D.getProection(subject.points[edge.p1]);
                const point2 = graph3D.getProection(subject.points[edge.p2]);
                canvas.line(point1.x, point1.y, point2.x, point2.y)
            }
        }

        //нарисовать точки
        if (canPrint.points) {
            for (let i = 0; i <= subject.points.length - 1; i++) {
                const points = graph3D.getProection(subject.points[i]);
                canvas.point(points.x, points.y);
            }
        }
    }


    function render() {
        canvas.clear();
        printAllPolygons();
        SCENE.forEach(subject => printSubject(subject));
        canvas.text(-9, 9, "FPS: " + FPSout);
        canvas.render();
    }

    function animation() {
        // Закрутим фигуру!!!
        SCENE.forEach(subject => {
            if (subject.animation) {
                for (let key in subject.animation) {
                    const { x, y, z } = subject.animation[key];
                    const xn = 0 - x;
                    const yn = 0 - y;
                    const zn = 0 - z;
                    const alpha = Math.PI / 180;
                    graph3D.animateMatrix(xn, yn, zn, key, alpha, -xn, -yn, -zn);
                    subject.points.forEach(point => graph3D.transform(point));
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
        graph3D.calcPlaneEquation(); // получить и записать плоскость экрана
        graph3D.calcWindowVectors(); // вычислить вектора экрана
        render(); // рисуем сцену
        requestAnimFrame(animloop);
    })();
};
