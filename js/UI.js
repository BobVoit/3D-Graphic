class UI {
    constructor({callbacks = {}, e = event}) {
        const move = (callbacks.move instanceof Function) ? callbacks.move : function () {};
        const keys = {
            "up": 38,
            "down": 40,
            "right": 39,
            "left": 37
        }

        let keyDown = 0;
    
        function setKey(keyCode) {
            keyDown = keyCode;
        }

        document.addEventListener('keydown', function(e) {
            setKey(e.keyCode);
            switch (keyDown) {
                case keys['up']: move('up'); keyDown = 0; break;
                case keys['down']: move('down'); keyDown = 0; break;
                case keys['right']: move('right'); keyDown = 0; break;
                case keys['left']: move('left'); keyDown = 0; break;
            }
        });

        keyDown = 0;
    }
}