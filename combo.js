class Combo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.combo_point = 0;
        this.exit_time = Date.now() + 500;
        this.exist = true;
    }

    set(block, time) {
        this.combo_block_xy(block);
        this.exit_time = Date.now() + time;
        this.exist = true;
        this.combo_point = 0;
    }

    zeropadding() {
        return ('0' + this.combo_point).slice(-3)
    }

    draw(ctx) {
        if (!this.exist) {
            return
        }
        const combo = this.zeropadding();
        ctx.save();

        ctx.font = "24px serif";
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'right';
        ctx.fillText('combo:' + combo, this.x, this.y);

        ctx.restore();
    }

    hit_blocks() {
        this.combo_point += 1
    }

    hit_paddle() {
        this.combo_point = 0
    }

    combo_block_xy(block) {
        this.x = block.x;
        this.y = block.y;
    }

    is_exist() {
        if (Date.now() > this.exit_time) {
            console.log(this.exist);
            this.exist = false;
        }
    }

    print(ctx) {
        if (!this.exist) {
            return;
        }
        this.is_exist();

        console.log(this.exit_time / Date.now());
        ctx.save();
        ctx.globalAlpha = Date.now() / this.exit_time;
        ctx.font = "16px serif";
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#fff';
        ctx.fillText('+' + this.combo_point, this.x, this.y - 12);
        ctx.strokeText('+' + this.combo_point, this.x, this.y - 12);
        ctx.restore();
    }
}