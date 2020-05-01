Surfaces.prototype.cylinder = (count = 10, a = 5, point = new Point(0, 0, 0), color = "#ff0000") => {
    const points = [];
    const edges = [];
    const polygons = [];


    // точки
    const delta = Math.PI  * 2 / count;
    for (let i = 0; i < Math.PI * 2; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x = a * Math.cos(i);
            const y = a * Math.sin(i);
            const z = j;
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
        if (i + points.length - count < points.length) {
            edges.push(new Edge(i,i + points.length - count));  
        }
    }
    console.log(points);
    /*for (let i = 0; i < points.length; i += count) {
        for (let j = 0; j < count; j++) {
            if (j + 1 < count) {
                //edges.push(new Edge(j + i, j + i + 1));
            }
            if (j + i + count < points.length) {
                edges.push(new Edge(j + i, j + i + count));
            }
            if (j + points.length - count < points.length) {
                edges.push(new Edge(j,j + points.length - count));
        
            }
        }    
    }*/
    edges.push(new Edge(0, points.length - count));
    
    // полигоны
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
        if (i + points.length - count + 1 < points.length) {
            polygons.push(new Polygon([i,i + points.length - count, i + points.length - count + 1, i + 1], color));  
        }
        

    }

    
    

    return new Subject(points, edges, polygons);
}