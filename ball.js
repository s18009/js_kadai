class Ball {
    static get ANGLE360() {
        return 6.283185307179586;
    }
    static get RADIAN() {
        return Math.PI / 180
    }

        get top() {
            return this.y - this.radius;
        }

        get bottom() {
            return this.y + this.radius;
        }

        get left() {
            return this.x - this.radius;
        }

        get right() {
            return this.x + this.radius;
        }

        get rightBottom() {
        return {
            x: this.x + this.collisionPoint[0].x,
            y: this.y + this.collisionPoint[0].y
        }
    }

    get leftBottom() {
        return {
            x: this.x + this.collisionPoint[1].x,
            y: this.y + this.collisionPoint[1].y
        }
    }

    get leftTop() {
        return {
            x: this.x + this.collisionPoint[2].x,
            y: this.y + this.collisionPoint[2].y
        }
    }

    get rightTop() {
        return {
            x: this.x + this.collisionPoint[3].x,
            y: this.y + this.collisionPoint[3].y
        }
    }

    constructor(x, y, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = 60;
        this.vx = speed * Math.cos(this.angle * Ball.RADIAN);
        this.vy = -speed * Math.sin(this.angle * Ball.RADIAN);
        this.color = color;
        this.isStart = false;
        this.collisionPoint = [
            {x: 0.7071 * radius, y: 0.7071 * radius},  // 45
            {x: -0.7071 * radius, y: 0.7071 * radius},  // 135
            {x: -0.7071 & radius, y: -0.7071 * radius},  // 225
            {x: 0.7071 * radius, y: -0.7071 * radius}  // 315
        ]
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Ball.ANGLE360);

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore();
    }

    isCollide(ctx) {
        let flag = false;
        this.collisionPoint.forEach((point) => {
            if (!flag) {
                const cx = this.x + point.x;
                const cy = this.y + point.y;

                flag = ctx.isPointInPath(cx, cy);
            }
        });
        return flag;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        // 右の壁の跳ね返りチェック
        if (this.x + this.radius > WINDOW_WIDTH) {
            this.x -= (this.x + this.radius) - WINDOW_WIDTH;
            this.vx = -this.vx;
        }
        // 上の壁の跳ね返りチェック
        if (this.y - this.radius < 0) {
            this.y -= this.y - this.radius;
            this.vy = -this.vy;
        }
        // 左の壁の跳ね返りチェック
        if (this.x - this.radius < 0) {
            this.x -= this.x - this.radius;
            this.vx = -this.vx;
        }
    }

    start() {
        this.isStart = true;
        if (this.vx !== 0 || this.vy !== 0) {
            return;
        }

        this.changeAngle(0);
    }

    reboundHorizontal() {
        this.x -= this.vx;
        this.vx = -this.vx;
    }

    reboundVertical() {
        this.y -= this.vy;
        this.vy = -this.vy;
    }

    changeAngle(vector) {
        if (! vector == 0) {
            this.angle -= Math.sign(this.vx) * vector * 15;
        }
        if (this.angle < 15) {
            this.angle = 15;
        }
        if (this.angle > 75) {
            this.angle = 75;
        }
        this.vx = this.speed * Math.cos(this.angle * Ball.RADIAN) * Math.sign(this.vx);
        this.vy = -this.speed * Math.sin(this.angle * Ball.RADIAN);
    }
}
