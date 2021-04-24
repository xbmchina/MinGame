import { Global } from "./Global";

var isCanDown;
cc.Class({
    extends: cc.Component,

    properties: {
        waterPrefab: cc.Prefab,
        typeNode: cc.Node,
        deathNode:cc.Node,
        spriteAtlas:cc.SpriteAtlas,
    },

    onLoad () {
        this.isCanDown=true;
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    },

    onTouchStart(event){
        cc.log('touch '+this.isCanDown);
        if(!this.isCanDown){
            return;
        }

        this.isCanDown=false;
        this.scheduleOnce(()=>{
            this.isCanDown=true;
        }, 1);
        let pos=this.node.convertToNodeSpaceAR(event.getLocation());
        this.spawnWater(pos);
        this.randomType();
    },
    //生成水果
    spawnWater(pos){
        let water=cc.instantiate(this.waterPrefab);
        this.node.addChild(water);
        
        water.x=pos.x;
        water.y=this.deathNode.y-120;
    },
     //随机类型
     randomType(){
        let random=Math.random()*5|0;
        let sprite=this.typeNode.getComponent(cc.Sprite);
        sprite.spriteFrame=this.spriteAtlas.getSpriteFrames()[random];
        Global.type=random;
    },
    start () {

    },
    resetGame(){
        cc.director.loadScene("game");
    }
    // update (dt) {},
});
