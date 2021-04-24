cc.Class({
    extends: cc.Component,

    properties: {
        ballNode:cc.Node,
        blockPrefab:cc.Prefab,
        blockAreaNode:cc.Node,
        scoreLabel:cc.Label

    },
    onLoad () {
      this.initPhysics();

      this.node.on("touchstart",this.boot,this);

      this.gameStart = 0;
      this.score = 0;
      this.initBlock();

    },
    onDestroy(){
        this.node.off("touchstart",this.boot,this);
    },
    update(dt){
        if(this.gameStart){
            let speed = -350 * dt;
            
            for(let blockNode of this.blockNodeArr){
                blockNode.x +=speed;

                if(blockNode.x < -cc.winSize.width /2-blockNode.width /2 ){
                    this.incrScore(1);
                    blockNode.x = this.getLastBlockPosX()+200;
                }
            }
        }

        if(this.ballNode.y < -cc.winSize.height /2){
            console.log("游戏结束");
            cc.director.loadScene("game");
        }


    },
    //记录得分
    incrScore(incr){
        this.score +=incr;
        this.scoreLabel.string = this.score;
    },
    //获取最后一块画板的位置
    getLastBlockPosX(){
        let posX = 0;
        for(let blockNode of this.blockNodeArr) {
            if(blockNode.x >posX){
                posX = blockNode.x;
            }
        }
        return posX;
    },
    //初始化画板
    initBlock(){
        //最后一个方块的x值
        this.lastBlockPosX = this.ballNode.x;
        this.blockNodeArr = [];
        for(let i =0;i<10;i++){
            //克隆一个预制体
            let blockNode = cc.instantiate(this.blockPrefab);
            blockNode.x = this.lastBlockPosX;
            blockNode.y = 0;

            let width = 80 + (Math.random() >.5?1:-1) * (40* Math.random());
            blockNode.getComponent("block").init(width);

            this.blockAreaNode.addChild(blockNode);
            this.blockNodeArr.push(blockNode);
            
            this.lastBlockPosX += 200;
        }

    },
    //初始化
    initPhysics(){
        let manager = cc.director.getPhysicsManager();
        
        manager.enabled = true;
        manager.gravity = cc.v2(0,-2400);
    },
    boot(){
        if(this.ballNode.getComponent("ball").initVel){
            let rigidBody = this.ballNode.getComponent(cc.RigidBody);
            rigidBody.linearVelocity = cc.v2(0,-1600);
            this.gameStart = 1;
        }
    }
});
