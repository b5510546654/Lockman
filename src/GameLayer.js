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
        
        this.createButton();

        this.createLockman();

        this.schedule(this.createMonster,1);
        
        this.scheduleUpdate();

        window.timeLabel = cc.LabelTTF.create( '0', 'Arial', 32 );
        window.timeLabel.setPosition( cc.p(15* 40, 14 * 40 - 15) );
        this.addChild( window.timeLabel);

        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 32 );
        this.scoreLabel.setPosition( cc.p( 15 * 40, 14 * 40 + 15 ) );
        this.addChild( this.scoreLabel );

        window.number = 0;

        window.monsterSpeed = 3;

        this.IsGameOver = false;

        setInterval(this.intervalNumber,500);
        return true;
    },

    createButton: function(){
        this.redButton = new RedButton(screenWidth / 4,screenHeight / 6);
        this.redButton.setPosition(cc.p(screenWidth / 4,screenHeight / 6));
        this.addChild(this.redButton);

        this.blueButton = new BlueButton(screenWidth / 4 + 120,screenHeight / 6);
        this.blueButton.setPosition(cc.p(screenWidth / 4 + 120,screenHeight / 6));
        this.addChild(this.blueButton);
    },

    createLockman: function(){
        this.lockman = new Lockman(screenWidth / 10, Lockman.POS.MID);
        this.lockman.setPosition(cc.p(screenWidth / 10, Lockman.POS.MID));
        this.addChild(this.lockman);
    },

    onKeyDown: function(e){
        if(this.IsGameOver)
            this.newGame();
        else
            switch(e){
                case cc.KEY.up:
                    this.lockman.moveUP();
                break;
                case cc.KEY.down:
                    this.lockman.moveDOWN();
                break;
                case cc.KEY.space:{
                    if(this.bulletList.length < 5)
                       this.createBullet(this.selectElement());
                   }
                break;
                case cc.KEY.w:
                    this.createItem();
                break;
            }
    },

    selectElement: function(){
        if(Math.floor(window.number*2) % 2 == 1)
            return 1;
        else
            return 2;
    },

    removeBullet: function(bullet){
        var i = this.bulletList.indexOf(bullet);
        if (i >= 0) this.bulletList.splice(i,1);
        this.removeChild(bullet);
    },

    createMonster: function(){
        var height = this.randomPosition();
        this.monster = new Monster(1.2 * screenWidth,height,window.monsterSpeed,this.bulletList,this.lockman);
        this.monster.setPosition(cc.p(1.2 * screenWidth,height));
        this.monsterList.push(this.monster);
        this.addChild(this.monster);
        this.monster.scheduleUpdate();
    },

    createItem: function(){
        var height = this.randomPosition();
        if(this.item) return 0;
        this.item = new Item(1.2 * screenWidth,height,window.monsterSpeed,this.bulletList,this.lockman);
        this.item.setPosition(cc.p(1.2 * screenWidth,height));
        this.addChild(this.item);
        this.item.scheduleUpdate();
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

    removeMonster: function(monster){
        var i = this.monsterList.indexOf(monster);
        if(i >= 0) this.bulletList.splice(i,1);
        this.removeChild(monster);
    },

    createBullet: function(atr){
        var posX = this.lockman.x + 50;
        var posY = this.lockman.y;
        this.bullet = new Bullet(posX,posY,atr);
        this.bulletList.push(this.bullet);
        this.bullet.setPosition(cc.p(posX,posY));
        this.addChild(this.bullet);
        this.bullet.scheduleUpdate();
    },
    
    intervalNumber: function(){
        window.number += 0.5;
        if(Math.floor(window.number*2)%10 == 0){
            window.monsterSpeed += 1;
        }
    },

    gameOver: function(){
        for(var i = 0;i < this.monsterList.length;i++){
            this.monsterList[i].unscheduleUpdate();
        }
        for(var i = 0;i < this.bulletList.length;i++){
            this.bulletList[i].unscheduleUpdate();
        }

        this.gameOverLabel = cc.LabelTTF.create( 'Game Over \n press any key to Continue', 'Arial', 60 );
        this.gameOverLabel.setPosition( cc.p( screenWidth/2, screenHeight/2) );
        this.addChild( this.gameOverLabel );

        this.unschedule(this.createMonster);
        this.lockman.stop();
        this.redButton.stop();
        this.blueButton.stop();
        if(this.item)
            this.item.unscheduleUpdate();
        this.unscheduleUpdate();
        this.IsGameOver = true;
    },

    updateScoreLabel: function(){        
        this.scoreLabel.setString(this.score);
    },

    deleteAll: function(){
        console.log('da');
        for(var i = 0; i < this.bulletList.length;i++){
            var bullet = this.bulletList[i];
            this.removeChild(bullet);
        }

        for(var i = 0; i < this.monsterList.length;i++){
            var monster = this.monsterList[i];
            this.removeChild(monster);
        }

        this.bulletList = [];

        this.monsterList = [];

        this.removeChild(this.item);
 
        this.item = null;

    },

    clear: function(){         
        this.deleteAll();

        this.removeChild(this.lockman);

        this.removeChild(this.redButton);

        this.removeChild(this.blueButton);

        this.gameOverLabel.setString('');
        window.number = 0;
        window.monsterSpeed = 3;
        this.score = 0;
        this.IsGameOver = false;
        this.scoreLabel.setString('0');
    },

    newGame: function(){
        this.clear();
        this.updateScoreLabel();
        this.createButton();
        this.createLockman();
        this.schedule(this.createMonster,1);
        this.scheduleUpdate();
    },

    update: function(dt){
        if(Math.floor(window.number*2) % 2 == 0)
             window.timeLabel.setString(window.number);
        if(this.bulletList.length == 3 && ( this.score % 5 == 0 || this.score % 4 == 1) ){
            this.createItem();
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

