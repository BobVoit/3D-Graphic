Surfaces.prototype.ellipsParaboloid = (count = 10, p = 5, q = 5, color = "#aa6f87", animation) => {
    const points = [];
    const edges = [];
    const polygons = [];

    const da = 2 * Math.PI / count;
    for (let alpha = 0; alpha < 2 * Math.PI; alpha += da) {
        for (let beta = 0; beta < 2 * Math.PI; beta += da ) {
            x = alpha * Math.sqrt(p) * Math.cos(beta);
            y = alpha * Math.sqrt(q) * Math.sin(beta);
            z = 0.5 * alpha * alpha;
            points.push(new Point(x, y, z));;
        } 
    }  
    
    for (let i = 0; i < points.length; i += count) {
        edges.push(new Edge(i, i + count - 1))
        
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
            polygons.push(new Polygon([i + j, i + j + 1, i + j + 1 + count, i + j + count], color))
        }        
    }
    
    for (let i = 0; i < points.length - count; i += count) {
        polygons.push(new Polygon([i, i + count - 1,  i + 2 * count - 1, count + i], color));
        
    }
    
    return new Subject(points, edges, polygons, animation);
}