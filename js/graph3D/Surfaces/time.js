Surfaces.prototype.time = (count = 20, color1 = '#DEB887', color2 = '#FFFFF0', color3 = '#4169E1'	) => {
    let points = [];
    let edges = [];
    let polygons = [];
    const PI = Math.PI;
    let delta = 2 * PI / count;
    const h = 10//высота цилиндра
    let R = 0;
    let a = 3, b = 5;

  

    //Боковая поверхность верхнего конуса
    for (let p = 0; p <= h; p++) {
        for (let i = 0; i <= PI; i += delta * 2 + count) {
            for (let j = 0; j < 2 * PI; j += delta) {
                const x = Math.cos(i) * Math.cos(j) * (R - p);
                const y = R + p;
                const z = Math.sin(j) * (R - p);
                points.push(new Point(x, y, z));
            }
        }
    }
console.log(points.length, count)
    //Основание верхнего конуса
    for (let i = 0; i <= PI; i += delta) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = R * Math.sin(i) * Math.sin(j);
            const y = h;
            const z = R * Math.sin(i) * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }
    console.log(points.length, count)
      
  //Боковая поверхность нижнего конуса
   for (let p = 0; p <= h; p++) {
        for (let i = 0; i <= PI; i += delta * 2 + count) {
            for (let j = 0; j < 2 * PI; j += delta) {
                const x = Math.cos(i) * Math.cos(j) * (R - p);
                const y = -R - p;
                const z = Math.sin(j) * (R - p);
                points.push(new Point(x, y, z));
            }
        }
    }

    //Основание нижнего конуса
    for (let i = 0; i <= PI; i += delta) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = R * Math.sin(i) * Math.sin(j);
            const y = -h;
            const z = R * Math.sin(i) * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }

    //Провести рёбра
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
    }

  

    //Провести полигоны
    for (let i = 0; i < 100; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color1))
        }
    }
    for (let i = 100; i < 160; i++)  {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
        }
    }
    for (let i = 160; i < 440; i++)  {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color3))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color3))
        }
    }


    for (let i = 440; i < 560; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
        }
    }
    for (let i = 560; i < 600; i++)  {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color1))
        }
    }
    for (let i = 600; i < 880; i++)  {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color3))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color3))
        }
    }
    


    return new Subject(
        points, edges, polygons
    );

}