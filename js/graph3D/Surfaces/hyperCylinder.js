Surfaces.prototype.hyperCylinder = (count = 10, size = 10, point = new Point(0, 0, 0), color = '#82afc4', animation) => {
    let points = [];
    let edges = [];
    let polygons = [];

    // Расставить точки 1-й части 
    for (let i = 0; i < count; i += 0.15) {
        for (let j = 0; j < count; j++) {
            const x = i - size;
            const y = 1 / x;
            const z = j - size;
            points.push(new Point(x, y, z));
        }
    }

    //Расставить точки 2-й части
    for (let i = count; i < 2 * count; i += 0.1) {
        for (let j = 0; j < count; j++) {
            const x = i - size;
            const y = 1 / x;
            const z = j - size;
            points.push(new Point(x, y, z));
        }
    }

    //Провести рёбра и полигоны
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        }
    }

    return new Subject(
        points, edges, polygons
    );

    return new Subject(points, edges, polygons, animation);
}