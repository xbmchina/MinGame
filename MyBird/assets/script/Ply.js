cc.Class({
    extends: cc.Component,

   
    properties: {
        gravity: cc.v2(0, -320),
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = this.gravity;
    },

    start () {

    }
});
