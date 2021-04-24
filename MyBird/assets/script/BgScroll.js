
cc.Class({
    extends: cc.Component,

    properties: {
        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
    },
    start () {
        this.scrSpeed = 300;
    },

    update (dt) {
        var s = this.scrSpeed * dt;
        this.node.x -= s;
        var w_Pos = this.bg1.convertToWorldSpaceAR(cc.v2(0, 0));
        if(w_Pos.x <= -480) {
            var temp = this.bg1;
            this.bg1 = this.bg2;
            this.bg2 = this.bg3;
            this.bg3 = temp;
            this.bg3.x = this.bg2.x + 960;
        }
    },
});
