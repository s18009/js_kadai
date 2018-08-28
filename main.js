const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 15;
const BLOCK_WIDTH = WINDOW_WIDTH / 15;
const BLOCK_HEIGHT = WINDOW_HEIGHT / 25;
//const MASS_X = Math.floor(WINDOW_WIDTH / BLOCK_WIDTH);
//const MASS_y = Math.floor(WINDOW_HEIGHT / BLOCK_HEIGHT);
var first_color = '#eb6ea5';

const input = new Input();
const ball = new Ball(400, 300, 10, 5, first_color);
const paddle = new Paddle(400, 550, 200, 10, 'white');
const score = new Score(WINDOW_WIDTH - 12, 24);
const combo = new Combo(WINDOW_WIDTH - 12, 44);
const blocks = [];
//var count = 0;
const color_box = {
    0:'#ff0000',
    1:'#ffa500',
    2:'#ffff00',
    3:'#008000',
    4:'#00ffff',
    5:'#0000ff',
    6:'#800080',
};

for (   var y = 50;  y < 400;  y+= 50 ) {
    for (   var x = 70; x < 750; x += 80) {
        color = color_box[(((y / 50) - 1 + Math.floor(x / 80)) % 7)];
        blocks.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, color));
    }
}

const combos = [];

for (i=0; i<10; i++) {
    combos.push(new Combo(0, 0));
    combos[i].exist = false;
}
console.log(combos);


window.setInterval(game_tick, SPF);

function game_tick() {
    // 入力状況に応じた呼び出し
    if (input.space && !ball.isStart) {
        ball.start();
    }
    if (!ball.isStart) {
        ball.x = paddle.x;
        ball.y = paddle.y - ball.radius - paddle.half_height;
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }


    // ボールの移動
    blocks_collide();
    ball.move();

    // ボールとブロックの当たり判定
    if (paddle.collide(ball)) {
        combo.hit_paddle();
        if (!(input.left || input.right) || (input.left && input.right)) {
            ball.changeAngle(0)
        } else if (input.left) {
            ball.changeAngle(-1)
        } else if (input.right) {
            ball.changeAngle(1)
        }
    };
    // ボールとブロックの当たり判定

    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks.forEach((block) => block.draw(ctx));
    score.draw(ctx);
    combo.draw(ctx);
    draw_combos(ctx);
    game_over();
    game_clear();

}

function blocks_collide() {
    blocks.forEach(function(block) {
        if (block.collide(ball)) {
            combo.hit_blocks();
            score.score += (block.point * combo.combo_point);
            block.exist = false;
            ball.color = block.color;
            make_combo(block);
        }
    });
}

function paddle_collide() {
    blocks.forEach(function(block) {
        if (paddle_collide(ball)) {
            combo.combo = 0;
        }
    });
}

function make_combo(block) {
    combos.some(function (c) {
        if (!c.exist) {
            c.set(block, 1000);
            c.combo_point = combo.combo_point;
            return true;
        }
    })
}

function draw_combos(ctx) {
    combo.exist = true;
    combos.forEach(function (c) {
        c.print(ctx);
    })
}

function game_over() {
    if (ball.y > WINDOW_HEIGHT) {
        ctx.save();
        ctx.font = "64px serif";
        ctx.textAlign = 'center';
        ctx.fillStyle = '#f00';
        ctx.strokeStyle = '#000';
        ctx.fillText('GAME OVER', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.strokeText('GAME OVER', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.restore();

        ball.vx = 0;
        ball.vy = 0;
    }
}

function game_clear() {
    var isGame_clear = false;
    blocks.forEach(function (block) {
        if (block.exist) {
            isGame_clear = true;
        }
    });
    if (isGame_clear) {
        return
    }
    ctx.save();
    ctx.font = "64px serif";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.fillText('GAME CLEAR', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    ctx.strokeText('GAME CLEAR', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    ctx.restore();
    ball.vx = 0;
    ball.vy = 0;
}