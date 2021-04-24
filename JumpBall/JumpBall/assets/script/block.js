
cc.Class({
    extends: cc.Component,

    properties: {
    },
    init(width){
        let selfCollider = this.node.getComponent(cc.PhysicsBoxCollider);
        this.node.width = width;
        selfCollider.size.width = width;
    }
});
