

cc.Class({
    extends: cc.Component,

    properties: {
        myHero: cc.Node,
        rollBth: cc.Button,
        bgNode1: [cc.Node],
        bgNode2: [cc.Node],
        bgNode3: [cc.Node],
        bgNode4: [cc.Node],
        bgNode5: [cc.Node],
        flNode: [cc.Node],
    },

    onLoad () {
        this.myHeroPlay('Run');
        this.rollBth.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.rollBth.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.rollBth.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    
        let bgNodeArr = [this.bgNode1,this.bgNode2,this.bgNode3,this.bgNode4,this.bgNode5,this.flNode];
        let bgNodeSpeedArr = [bgNodeMoveTime1,bgNodeMoveTime2,bgNodeMoveTime3,bgNodeMoveTime4,bgNodeMoveTime5,floorNodeMoveTime1]; 
        
        for (let j = 0; j < bgNodeArr.length; j++) {
            let bNode = bgNodeArr[j];
            for (let i = 0; i < bNode.length; i++) {
                let bgNode = bNode[i];
                let width =  bgNode.width;
                bgNode.setPosition(i*(width - 3),0);
                //第一个Node是2s走500,第2个节点就要4s走1000
                let move1 = cc.moveTo(bgNodeSpeedArr[j]*i+bgNodeSpeedArr[j],cc.v2(-(width - 3),0));
                let seq = cc.sequence(move1,cc.callFunc(this.backMoveEnd,this,bgNodeSpeedArr[j]));
                bgNode.runAction(seq);
            }
        }
    },
    backMoveEnd(bgNode,speed){
        let width = bgNode.width;
        bgNode.setPosition((width - 3),0);
        console.log("width="+width);
        //每个Node回到width - 3，比原来多1倍，故时间应该4s走1000
        let move1 = cc.moveTo(speed*2,cc.v2(-(width - 3),0));
        let seq = cc.sequence(move1,cc.callFunc(this.backMoveEnd,this,speed));
        bgNode.runAction(seq);
    },
    //滑铲按钮按下后事件监听
    touchStart(){
        cc.log("touchStart==");
        let animCtrl = this.myHero.getComponent(cc.Animation);
        if(animCtrl.currentClip.name == 'Jump'){
            return;
        }
        this.myHeroPlay('Roll');
    },
    //滑铲按钮移出后事件监听
    touchEnd(){
        cc.log("touchEnd==");
        let animCtrl = this.myHero.getComponent(cc.Animation);
        if(animCtrl.currentClip.name == 'Jump'){
            return;
        }
        this.myHeroPlay('Run');
    },
    //跳跃动画完毕后回调
    callBackDownOver:function(){
        cc.log("callBackDownOver==");
        this.myHeroPlay('Run');
    },
    //跳跃按钮回调方法。
    onAnimationChange(target,data){
        cc.log("xxxx=="+data);
        if(data=='Jump' && this.isCanChangeAnimation('Jump')){
            let moveUp = cc.moveTo(1,-79,40).easing(cc.easeCubicActionOut());
            let moveDown = cc.moveTo(1,-79,-57).easing(cc.easeCubicActionIn());
            let callBack = cc.callFunc(this.callBackDownOver,this);

            let seq = cc.sequence(moveUp,moveDown,callBack);
            this.myHero.runAction(seq);
        }
       
        this.myHeroPlay(data);
    },
    //玩家对象动作方法
    myHeroPlay(playName){
        if(!this.isCanChangeAnimation(playName)){
            return;
        }
        let animCtrl = this.myHero.getComponent(cc.Animation);
        if(playName == 'Roll'){
            this.myHero.setPosition(-79,-70);
        }else if (playName == 'Run'){
            this.myHero.setPosition(-79,-70);
        }
        animCtrl.play(playName);
    },
    //是否可以切换动作
    isCanChangeAnimation(playName){
        let animCtrl = this.myHero.getComponent(cc.Animation);
        if(animCtrl.currentClip==null){
            return true;
        }
        if(animCtrl.currentClip.name == 'Roll'){
            if(playName == 'Jump'){
                return false;
            }
        }else if(animCtrl.currentClip.name == 'Jump'){
            if(playName == 'Run'){
                return true;
            }
            return false;
        }
        return true;
    }

});
