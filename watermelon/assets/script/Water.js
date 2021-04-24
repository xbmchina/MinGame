import { Global } from "./Global";

cc.Class({
    extends: cc.Component,

    properties: {
        atlas: cc.SpriteAtlas
    },
    onLoad () {
        this.changeType(Global.type);
    },
    changeType(type) {
        type = this.checkType(type);

        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.atlas.getSpriteFrames()[type];
        let physic = this.node.getComponent(cc.PhysicsCircleCollider);
        physic.tag = type;
        physic.radius = this.node.width / 2;
        physic.apply();
    },
    checkType(type) {
        if (type < 0) return 0;
        if (type > 10) return 10;
        return type;
    },
    onBeginContact(contact, self, other) {
        cc.log('concat');
        if (other.node.group == 'default' || self.tag != other.tag) {
            return;
        }
        if (self.node.y < other.node.y) {
            other.node.destroy();
            this.waterboom(self.tag);
        }
        else {
            this.node.destroy();
        }
    },

    waterboom(type) {
        this.changeType(type + 1);
        this.node.getComponent(cc.AudioSource).play();
    },
    start () {

    },

    // update (dt) {},
});
