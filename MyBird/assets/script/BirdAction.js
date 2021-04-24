var ani;
var isDead;

cc.Class({
    extends: cc.Component,

    properties: {
        pipes1: cc.Node,
        pipes2: cc.Node,
        pipes3: cc.Node,
        retry: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        isDead = false;

        ani = this.getComponent(cc.Animation);
        ani.play('fly');
        this.body = this.getComponent(cc.RigidBody);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onSpaceDown, this);
    },

    onSpaceDown (event) {
        var v = this.body.linearVelocity;
        v.y += 200;
        this.body.linearVelocity = v;
    },

    checkCollision (pipe) {
        if (this.node.x + 91 / 2 < pipe.x - 148 / 2) {
            return;
        }
        if (this.node.x - 91 / 2 > pipe.x + 148 / 2) {
            return;
        }
        if (this.node.y + 55 / 2 < pipe.y + 241 / 2 && this.node.y - 55 / 2 > pipe.y - 241 / 2) {
            return;
        }
        isDead = true;
    },

    update (dt) {
        if (isDead == false) {
            this.checkCollision(this.pipes1);
            this.checkCollision(this.pipes2);
            this.checkCollision(this.pipes3);
            this.node.rotation = -this.node.y;
        } else {
            ani.play();
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onSpaceDown, this);
            this.retry.node.active = true;
        }
    },

    onClickRetry () {
        cc.director.loadScene('game_start');
        cc.director.getPhysicsManager().enabled = false;
    },
});
