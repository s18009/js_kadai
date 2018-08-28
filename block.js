class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.half_width = width / 2;
        this.half_height = height / 2;
        this.color = color;
        this.exist = true;
        this.point = 100;
    }

    draw(ctx) {
        if (!this.exist) {
            return
        }
        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.beginPath();
        ctx.moveTo(this.half_width, 0);
        ctx.lineTo(this.half_width, this.half_height);
        ctx.lineTo(-this.half_width, this.half_height);
        ctx.lineTo(-this.half_width, -this.half_height);
        ctx.lineTo(this.half_width, -this.half_height);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000';
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    collide(ball) {
        if (!this.exist) {
            return false;
        }
        let iscollide = false;
        const top = this.y - this.half_height;
        const bottom = this.y + this.half_height;
        const left = this.x - this.half_width;
        const right = this.x + this.half_width;

        // check ball collide a block
        if (top < ball.bottom && bottom > ball.top && left < ball.right && right > ball.left) {
            iscollide = true;
        } else if (top < ball.leftTop && bottom > ball.leftBottom && left < ball.rightTop && right > ball.leftTop) {
            iscollide = true;
        }

        // direction of block collided
        if (iscollide) {
            if (top < ball.y+1 && bottom > ball.y-1) {
                ball.reboundHorizontal();
            } else {
                ball.reboundVertical();
            }
        }

        return iscollide;
    }
}