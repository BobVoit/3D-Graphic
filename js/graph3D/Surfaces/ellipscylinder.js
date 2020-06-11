Surfaces.prototype.ellipscylinder = (count = 20, color = '#be3b8d', a = 5, b = 5, h = 10) => {
    let points = [];
    let edges = [];
    let polygons = [];
    const PI = Math.PI;
    let delta = 2 * PI / count;
    //Верхнее основание цилиндра
    for (let i = 0; i <= PI; i += delta * 2) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = Math.cos(i) * Math.cos(j) * a;
            const y = Math.sin(j) * b;
            const z = 0;
            points.push(new Point(x, y, z));
        }
    }

    //Боковая поверхность цилиндра
    for (let p = 0; p < h; p++) {
        for (let i = 0; i <= PI; i += delta * 2 + count) {
            for (let j = 0; j < 2 * PI; j += delta) {
                const x = Math.cos(i) * Math.cos(j) * a;
                const y = Math.sin(j) * b;
                const z = p;
                points.push(new Point(x, y, z));
            }
        }
    }

    //Нижнее основание цилиндра
    for (let i = 0; i <= PI; i += delta * 2) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = Math.cos(i) * Math.cos(j) * a;
            const y = Math.sin(j) * b;
            const z = h - 1;
            points.push(new Point(x, y, z));
        }
    }

    //Рёбра и полигоны
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
        if ((i + 1) >= count && (i + 1) % count === 0) {
            edges.push(new Edge(i, i - count + 1))
        }
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        }
        if ((i + 1) >= count && i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i - count + 1, i + 1, i + count], color));
        }
    }
    return new Subject(
        points, edges, polygons
    );

}
