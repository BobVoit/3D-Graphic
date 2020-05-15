Surfaces.prototype.hyperCylinder = (count = 20, a = 20, b = 10, point = new Point(0, 0, 0), color = '#ff0000', animation) => {
    let points = [];
    let edges = [];
    let polygons = [];

    // точки
    const delta = Math.PI  * 2 / count;
    for (let i = 0; i <= Math.PI ; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x = point.x + a * Math.cosh(i);
            const y = point.y + b * Math.sinh(i);
            const z = point.z + j;    
            points.push(new Point(x, y, z));
        }
    }  

    for (let i = 0; i <= Math.PI; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x = point.x + (-a) * Math.cosh(i);
            const y = point.y + b * Math.sinh(i);
            const z = point.z + j;    
            points.push(new Point(x, y, z));
        }
    }

    // ребра 
    for (let i = 0; i < points.length; i++) {
        // вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0 && (i + 1)) {
            edges.push(new Edge(i, i + 1));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count));
        }
        // поперёк
        if (i + count < points.length && (i < points.length / 2) && !(i + count >= points.length / 2)) {
            edges.push(new Edge(i, i + count));
        }
        if (i + count < points.length && !(i < points.length / 2) && (i + count >= points.length / 2)) {
            edges.push(new Edge(i, i + count));
        }
    }

    // полигоны
    for (let i = 0; i < points.length / 2; i++) {
        
        if (i + 1 + count < points.length / 2 && (i + 1) % count !== 0 ) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        } else if ((i + count) < points.length / 2 && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
    }

    for (let i = points.length / 2; i < points.length; i++) {
        
        if (i + 1 + count < points.length && (i + 1) % count !== 0 ) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
    }

    return new Subject(points, edges, polygons, animation);
}