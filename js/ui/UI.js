class UI {
    constructor({callbacks = {}}) {
        this.move = (callbacks.move instanceof Function) ? callbacks.move : function () {};
        const printPoints = (callbacks.printPoints instanceof Function) ? callbacks.printPoints : function () {};
        const printEdges = (callbacks.printEdges instanceof Function) ? callbacks.printEdges : function () {};
        const printPolygons = (callbacks.printPolygons instanceof Function) ? callbacks.printPolygons : function () {};
        const printFigures = (callbacks.printPolygons instanceof Function) ? callbacks.printFigures : function () {};
        document.addEventListener('keydown', event => this.keyDown(event));
        // для полигонов, точуе и ребер
        document
            .getElementById('printPoints')
            .addEventListener('click', function() { printPoints(this.checked);});
        document
            .getElementById('printEdges')
            .addEventListener('click', function() { printEdges(this.checked);});
        document
            .getElementById('printPolygons')
            .addEventListener('click', function() { printPolygons(this.checked);});
        // для выбора фигур для рисованияы  
        document
            .getElementById('figures')
            .addEventListener('click', function() { printFigures(this.value);});
    }

    keyDown(event) {
        switch(event.keyCode) {
            case 37: return this.move('left');
            case 38: return this.move('up');
            case 39: return this.move('right');
            case 40: return this.move('down');
        }
    }
}