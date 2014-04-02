var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.bulletList = [];
        this.monsterList = [];

        this._super();
        this.background = cc.Sprite.create ('res/images/background.png');
        this.background.setAnchorPoint(new cc.Point(0,0));
        this.addChild(this.background,0);

        this.setKeyboardEnabled(true);
        this._super(new cc.Color4B(127,127,127,255));
        this.setPosition(new cc.Point(0,0));
        
        this.redButton = new RedButton(screenWidth / 4,screenHeight / 6);
        this.redButton.setPosition(cc.p(screenWidth / 4,screenHeight / 6));
        this.addChild(this.redButton);

        this.blueButton = new BlueButton(screenWidth / 4 + 120,screenHeight / 6);
        this.blueButton.setPosition(cc.p(screenWidth / 4 + 120,screenHeight / 6));
        this.addChild(this.blueButton);


        this.lockman = new Lockman(screenWidth / 10, Lockman.POS.MID);
        this.lockman.setPosition(cc.p(screenWidth / 10, Lockman.POS.MID));
        this.addChild(this.lockman);

        this.schedule(this.createMonster,2);
        
        this.scheduleUpdate();

        window.number = 2;
        setInterval(this.intervalNumber,500);
        return true;
    },
    onKeyDown: function(e){
        console.log(window.number);
        switch(e){
            case cc.KEY.up:
                this.lockman.moveUP();
            break;
            case cc.KEY.down:
                this.lockman.moveDOWN();
            break;
            case cc.KEY.space:
               this.createBulletX(window.number);
            break;
            /*case cc.KEY.z:
               this.createBulletX(1);
            break;
            case cc.KEY.x:
               this.createBulletX(2);
            break;
            case cc.KEY.w:
                this.createMonster();
            break;*/
        }
    },
    deleteBullet: function(bullet){
        // var shout = "";
        // for(var a = 0;a<this.bulletList.length;a++){
        //     var pos = this.bulletList[a].getPosition();
        //     shout += pos.x+" "+pos.y+"   ";
        // }
        // console.log(shout);
        var i = this.bulletList.indexOf(bullet);
        if (i >= 0) this.bulletList.splice(i,1);
    },
    createMonster: function(){
        var height = this.randomPosition();
        this.monster = new Monster(1.2 * screenWidth,height,this.bulletList,this.lockman,this);
        this.monster.setPosition(cc.p(1.2 * screenWidth,height));
        this.monsterList.push(this.monster);
        this.addChild(this.monster);
        this.monster.scheduleUpdate();
    },
    randomPosition: function(){
        var random = Math.floor(Math.random()*3);
        switch(random){
            case 0 : return screenHeight / 3 ;
            break;
            case 1 : return screenHeight / 3 + screenHeight / 4;
            break;
            case 2 : return screenHeight / 3 + 2 * screenHeight / 4;
            break;
        }
    },
    deleteMonster: function(monster){
        var i = this.monsterList.indexOf(monster);
        if(i >= 0) this.bulletList.splice(i,1);
    },
    createBulletX: function(atr){
        var posX = this.lockman.x + 50;
        var posY = this.lockman.y;
        this.bullet = new Bullet(posX,posY,this,atr);
        this.bulletList.push(this.bullet);
        this.bullet.setPosition(cc.p(posX,posY));
        this.addChild(this.bullet);
        this.bullet.scheduleUpdate();
    },
    intervalNumber: function(){
        if(window.number == 1){
            window.number = 2;
        }
        else{
            window.number = 1;
        }
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});

