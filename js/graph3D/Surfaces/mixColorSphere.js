Surfaces.prototype.mixColorSphere = (count = 40, R = 6, point = new Point(0, 0, 0), animation) => {
    let points = [];
    let edges = [];
    let polygons = [];
    let center = new Point(point.x, point.y, point.z);

    // точки
    const delta = Math.PI  * 2 / count;
    for (let i = 0; i <= Math.PI; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x = point.x + R * Math.sin(i) * Math.cos(j);
            const y = point.y + R * Math.sin(i) * Math.sin(j);
            const z = point.z + R * Math.cos(i);
            points.push(new Point(x, y, z));
        }
    }  

    // ребра 
    for (let i = 0; i < points.length; i++) {
        // вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count));
        }
        // поперёк
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count));
        }
    }

    // полигоны
    for (let i = 0; i < points.length; i++) {
        let r = Number(Math.floor(Math.random() * (255))).toString(16);
        let g = Number(Math.floor(Math.random() * (255))).toString(16);
        let b = Number(Math.floor(Math.random() * (255))).toString(16);
        let color = '#' + r + g + b;
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
    }

    points.push(center);

    return new Subject(points, edges, polygons, animation);
}