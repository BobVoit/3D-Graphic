// Surfaces.prototype.hyperbolicParaboloid = (count = 20, animation, point = new Point(0, 0, 0)) => {
//     const points = [];
//     const edges = [];
//     const polygons = [];


//     const size = 10;
//     const delta = size / count;
//     // точки
//     for (let i = 0; i < count; i++) {
//         for (let j = 0; j < count; j++) {
//             const x = point.x + i * delta - size / 2;
//             const y = point.y + j * delta - size / 2;
//             const z = point.z +  x * x / 2 - y * y / 2;
//             points.push(new Point(x, y, z));            
//         }
//     }

    
//     for (let i = 0; i < points.length; i++) {
//         // ребра
//         if (i + 1 < points.length && (i + 1) % count !== 0) {
//             edges.push(new Edge(i, i + 1));
//         };   
//         if (i + count < points.length) {
//             edges.push(new Edge(i, i + count));
//         }; 

//         // полигоны
//         if (i + 1 + count < points.length && (i + 1) % count !== 0) {
//             polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]))
//         };
//     }
    

//     return new Subject(points, edges, polygons, animation);
// }

Surfaces.prototype.hyperbolicParaboloid = (count = 10, color = '#FF0000') => {
    let points = [];
    let edges = [];
    let polygons = [];
    const size = 10;

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

}
