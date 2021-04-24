
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {
        let physic=cc.director.getPhysicsManager();
        physic.enabled=true;
    },

    start () {

    },
});
