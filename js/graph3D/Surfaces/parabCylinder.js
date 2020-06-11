// Surfaces.prototype.parabCylinder = (count = 20, p = 10, point = new Point(0, 0, 0), color = '#ff0000', animation) => {
//     let points = [];
//     let edges = [];
//     let polygons = [];

//     // точки
//     const delta = Math.PI  * 2 / count;
//     for (let i = 0; i < Math.PI; i += delta) {
//         for (let j = 0; j < Math.PI * 2; j += delta) {
//             const x = point.x + i;
//             const y = point.y + Math.sqrt(2 * p * i);
//             const z = point.z + j; 
//             points.push(new Point(x, y, z));
//         }
//     }  

//     for (let i = 0; i < Math.PI; i += delta) {
//         for (let j = 0; j < Math.PI * 2; j += delta) {
//             const x = point.x + i;
//             const y = point.y + (-Math.sqrt(2 * p * i));
//             const z = point.z + j; 
//             points.push(new Point(x, y, z));
//         }
//     } 
    

//     // ребра 
//     for (let i = 0; i < points.length; i++) {
//         // вдоль
//         if (i + 1 < points.length && (i + 1) % count !== 0) {
//             edges.push(new Edge(i, i + 1));
//         } else if ((i + 1) % count === 0) {
//             edges.push(new Edge(i, i + 1 - count));
//         }
//         // поперёк
//         if (i + count < points.length) {
//             edges.push(new Edge(i, i + count));
//         }
//     }

//     // полигоны
//     for (let i = 0; i < points.length; i++) {
//         if (i + 1 + count < points.length && (i + 1) % count !== 0) {
//             polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
//         } else if ((i + count) < points.length && (i + 1) % count === 0) {
//             polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
//         }
//     }

//     return new Subject(points, edges, polygons, animation);
// }

Surfaces.prototype.parabCylinder = (count = 10, color = '#FF0000', point = new Point(0, 0, 0), animation) => {
    let points = [];
    let edges = [];
    let polygons = [];
    const size = 10;
    // Расставить точки
    for (let i = -count; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const x = i + size/count;
            const y = x * x / size;
            const z = j - size;
            points.push(new Point(x, y, z));
        }
    }
    // Рёбра
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
        // Полигоны
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        }
    }

    return new Subject( points, edges, polygons, animation);

}
