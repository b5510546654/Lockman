
var Monster = cc.Sprite.extend({
	ctor: function(x,y,speed,bulletList,lockman){
		this._super();
		this.atr = this.randomAtr();
		if(this.atr == Monster.Atr.RED)
			this.initWithFile('res/images/monster.png');
		else if(this.atr == Monster.Atr.BLUE)
			this.initWithFile('res/images/monster2.png');
		else
			this.initWithFile('res/images/monster3.png')
		this.speed = speed;
		this.x = x;
		this.y = y;

		this.lockman = lockman;
		this.bulletList = bulletList;
	},

	update: function(dt){
		this.bulletCollide();
		this.lockmanCollide();

		var posx = this.getPositionX();
		if(posx < -50){
			this.getParent().gameOver();
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
				if(bullet.atr == this.atr || this.atr == Monster.Atr.WHITE){
					this.getParent().score ++;
					this.getParent().updateScore();
					this.deleteBullet(bullet);
					this.deleteMonster(this);
				}
				else{
					this.speed *= 1.75;
					this.deleteBullet(bullet);
				}
				break;
			}
		}
	},

	isHit:function(pos){
		return (Math.abs(pos.x - this.x) <= 50 && Math.abs(pos.y - this.y) < 30);
	},


	deleteMonster: function(monster){
		this.getParent().removeMonster(monster);
	},

	deleteBullet: function(bullet){
		this.getParent().removeBullet(bullet);
	},

	lockmanCollide: function(){
		var lpos = this.lockman.getPosition();
		if(this.isHit(lpos)){
			this.getParent().gameOver();
		}
	},
	
	randomAtr : function(){
		var random = Math.ceil(Math.random() * 3);
		return random;
	}
});
Monster.Atr = {
	RED : 1,
	BLUE : 2,
	WHITE : 3
}