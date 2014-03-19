var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.bulletList = [];

        this.setKeyboardEnabled(true);
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.lockman = new Lockman(screenWidth/10, Lockman.POS.MID);
        this.lockman.setPosition(cc.p(screenWidth/10, Lockman.POS.MID ));
        this.addChild(this.lockman);

        this.monster = new Monster(1.5 * screenWidth,screenHeight / 3 ,this.bulletList,this.lockman,this);
        this.monster.setPosition(cc.p(1.5 * screenWidth,screenHeight / 3 ));
        this.addChild(this.monster);
        this.monster.scheduleUpdate();

        this.scheduleUpdate();
        return true;
    },
    onKeyDown: function(e){
        switch(e){
            case cc.KEY.up:
                this.lockman.moveUP();
            break;
            case cc.KEY.down:
                this.lockman.moveDOWN();
            break;
            case cc.KEY.space:
               this.createBullet();
            break;
        }
    },
    createBullet: function(){
        var posX = this.lockman.x + 50;
        var posY = this.lockman.y;
        this.bullet = new Bullet(posX,posY,this);
        this.bulletList.push(this.bullet);
        this.bullet.setPosition(cc.p(posX,posY));
        this.addChild(this.bullet);
        this.bullet.scheduleUpdate();
    },
    deleteBullet: function(bullet){
        // var shout = "";
        // for(var a = 0;a<this.bulletList.length;a++){
        //     var pos = this.bulletList[a].getPosition();
        //     shout += pos.x+" "+pos.y+"   ";
        // }
        // console.log(shout);
        var i = this.bulletList.indexOf(bullet);
        if (i >= 0) this.bulletList.splice(i, 1);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

