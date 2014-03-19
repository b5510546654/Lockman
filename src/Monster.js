
var Monster = cc.Sprite.extend({
	ctor: function(x,y,bulletList,lockman,gameLayer){
		this._super();
		this.initWithFile('res/images/monster.png');
		this.speed = 5;
		this.x = x;
		this.y = y;
		this.lockman = lockman;
		this.gameLayer = gameLayer;
		this.bulletList = bulletList;
	},
	update: function(dt){
		this.bulletCollide();
		this.lockmanCollide();
		var posx = this.getPositionX();
		if(posx < -50){
			//GAME OVER
		}
		else{
			this.x = this.getPositionX()-this.speed
			this.setPositionX(this.x);
		}
	},
	bulletCollide: function(){
		for(var i = 0 ; i < this.bulletList.length ; i++){
			var bullet = this.bulletList[i];
			var bpos = bullet.getPosition();
			if(Math.abs(bpos.x-this.x) <= 50 && Math.abs(bpos.y-this.y) < 30){
				this.gameLayer.removeChild(this);
				break;
			}
		}
	},
	lockmanCollide: function(){
		var lpos = this.lockman.getPosition();
		if(Math.abs(lpos.x-this.x) <= 50 && Math.abs(lpos.y-this.y) < 30){
			//gameover
			console.log("DIE");
		}
	}
});