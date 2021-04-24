var isDead;
var count;
var screenWidth = 960;
var obstacleWidth = 148;

cc.Class({
    extends: cc.Component,

    properties: {
        pipes1: cc.Node,
        pipes2: cc.Node,
        pipes3: cc.Node,
        bird: cc.Node,
        score: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        isDead = false;
        count = 0;
        this.spawnSpeed = 600;
        let pipesStartOffsetX = screenWidth/2 + obstacleWidth / 2;
        let space = (screenWidth + obstacleWidth) / 3;
        this.pipes1.x = pipesStartOffsetX + space * 0;
        this.pipes2.x = pipesStartOffsetX + space * 1;
        this.pipes3.x = pipesStartOffsetX + space * 2;
    },

    pipeSpawn (pipe) {
        pipe.x -= 6;
        if (pipe.x <= -554 && isDead == false) {
            pipe.x += screenWidth + obstacleWidth;
            pipe.y = 200 - Math.random() * 300;
            count++;
        }
    },

    update (dt) {
        this.pipeSpawn(this.pipes1);
        this.pipeSpawn(this.pipes2);
        this.pipeSpawn(this.pipes3);
        if (isDead == false) {
            this.checkCollision(this.pipes1);
            this.checkCollision(this.pipes2);
            this.checkCollision(this.pipes3);
        } else {
            this.score.string = count.toString();
            return;
        }
    },

    checkCollision (pipe) {
        if (this.bird.x + 91 / 2 < pipe.x - 148 / 2) {
            return;
        }
        if (this.bird.x - 91 / 2 > pipe.x + 148 / 2) {
            return;
        }
        if (this.bird.y + 55 / 2 < pipe.y + 241 / 2 && this.bird.y - 55 / 2 > pipe.y - 241 / 2) {
            return;
        }
        isDead = true;
    },
});
