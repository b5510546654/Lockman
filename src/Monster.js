
var Monster = cc.Sprite.extend({
	ctor: function(x,y,bulletList,lockman,gameLayer){
		this._super();
		this.atr = this.randomAtr();
		if(this.atr == Monster.Atr.RED)
			this.initWithFile('res/images/monster.png');
		else
			this.initWithFile('res/images/monster2.png');
		this.speed = 3;
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
			this.gameLayer.removeChild(this);
			this.gameLayer.deleteMonster(this);
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
				if(bullet.atr == this.atr){
					this.gameLayer.removeChild(this);
					this.gameLayer.deleteMonster(this);
				}
				else{
					this.speed += 0.5;
				}
				this.gameLayer.removeChild(bullet);
				this.gameLayer.deleteBullet(bullet);
				break;
			}
		}
	},
	lockmanCollide: function(){
		var lpos = this.lockman.getPosition();
		if(Math.abs(lpos.x-this.x) <= 50 && Math.abs(lpos.y-this.y) < 30){
			//gameover
		}
	},
	randomAtr : function(){
		var random = Math.ceil(Math.random()*2);
		return random;
	}
});
Monster.Atr = {
	RED : 1,
	BLUE : 2
}