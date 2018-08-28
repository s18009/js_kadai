class Score {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    zeropadding() {
        return ('000000' + this.score).slice(-6)
    }

    draw(ctx) {
        const score = this.zeropadding();
        ctx.save();

        ctx.font = "24px serif";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'right';
        ctx.fillText('score: ' + score, this.x, this.y);

        ctx.restore();
    }
}