class Input {
    constructor() {
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;
        this.space = false;
        window.addEventListener('keydown', (event) => {
            this.keyDown(event)
        });
        window.addEventListener('keyup', (event) => {
            this.keyUp(event)
        });
    }

    keyDown(event) {
        let cancel = true;

        if (event.key === "ArrowLeft") {
            this.left = true;
        } else if (event.key === "ArrowRight") {
            this.right = true;
        } else if (event.key === "ArrowUp") {
            this.up = true;
        } else if (event.key === "ArrowDown") {
            this.down = true;
        } else if (event.key === " ") {
            this.space = true;
        } else {
            cancel = false;
        }

        if (cancel) {
            event.preventDefault();
        }
    }

    keyUp(event) {
        if (event.key === "ArrowLeft") {
            this.left = false;
        }
        if (event.key === "ArrowRight") {
            this.right = false;
        }
        if (event.key === "ArrowUp") {
            this.up = false;
        }
        if (event.key === "ArrowDown") {
            this.down = false;
        }
        if (event.key === " ") {
            this.space = false;
        }
    }
}