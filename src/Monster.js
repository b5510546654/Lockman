
var Monster = cc.Sprite.extend({
	ctor: function(x,y,speed,bulletList,lockman,gameLayer){
		this._super();
		this.atr = this.randomAtr();
		if(this.atr == Monster.Atr.RED)
			this.initWithFile('res/images/monster.png');
		else
			this.initWithFile('res/images/monster2.png');

		this.speed = speed;
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
			this.gameLayer.gameOver();
			this.deleteMonster(this);
		}
		else{
			this.x = this.getPositionX() - this.speed;
			this.setPositionX(this.x);
		}
	},

	bulletCollide: function(){
		for(var i = 0 ; i < this.bulletList.length ; i++){
			var bullet = this.bulletList[i];
			var bpos = bullet.getPosition();
			if(this.isHit(bpos)){
				if(bullet.atr == this.atr){
					this.gameLayer.score ++;
					this.gameLayer.updateScoreLabel();
					this.deleteMonster(this);
				}
				else{
					this.speed *= 1.75;
				}
				this.deleteBullet(bullet);
				break;
			}
		}
	},

	isHit:function(pos){
		return (Math.abs(pos.x - this.x) <= 50 && Math.abs(pos.y - this.y) < 30);
	},


	deleteMonster: function(monster){
		this.gameLayer.removeChild(monster);
		this.gameLayer.removeMonster(monster);
	},

	deleteBullet: function(bullet){
		this.gameLayer.removeChild(bullet);
		this.gameLayer.removeBullet(bullet);
	},

	lockmanCollide: function(){
		var lpos = this.lockman.getPosition();
		if(this.isHit(lpos)){
			this.gameLayer.gameOver();
		}
	},
	
	randomAtr : function(){
		var random = Math.ceil(Math.random() * 2);
		return random;
	}
});
Monster.Atr = {
	RED : 1,
	BLUE : 2
}