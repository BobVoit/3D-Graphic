Surfaces.prototype.sphere = (count = 10, R = 10) => {
    const points = [];
    const edges = [];
    const polygons = [];

    const da = 2 * Math.PI / count;
    for (let alpha = 0; alpha < 2 * Math.PI; alpha += da) {
        for (let beta = 0; beta < 2 * Math.PI; beta += da ) {
            x = Math.cos(alpha) * Math.cos(beta) * R;
            y = Math.sin(beta) * R;
            z = Math.sin(alpha) * Math.cos(beta) * R;
            points.push(new Point(x, y, z));;
        } 
    }  

    for (let i = 0; i < points.length; i++) {
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }

    for (let i = 0; i < points.length; i += count) {
        for (let j = 0; j < count - 1; j++) {
            edges.push(new Edge(i + j, i + j + 1))
        }
    }

    for (let i = 0; i < count - 1; i++) {
        for (let j = 0; j < points.length - count; j += count) {
            polygons.push(new Polygon([i + j, i + j + 1, i + j + 1 + count, i + j + count], "#00ef00"))
        }        
    }

    return new Subject(points, edges, polygons);
}