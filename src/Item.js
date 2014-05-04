var Item = cc.Sprite.extend({
	ctor: function(x,y,speed,bulletList,lockman){
		this._super();
		this.initWithFile('res/images/Item.png');
		this.speed = speed * 2;
		this.x = x;
		this.y = y;
		this.bulletList = bulletList;
		this.lockman = lockman;
	},

	update: function(dt){
		this.bulletCollide();
		this.lockmanCollide();

		var posx = this.getPositionX();
		if(posx < -50){
			this.deleteItem();
		}
		else{
			this.x = this.getPositionX() - this.speed;
			this.setPositionX(this.x);
		}
	},

	lockmanCollide: function(){
		var lpos = this.lockman.getPosition();
		if(this.isHit(lpos)){
			this.getParent().score += this.getParent().monsterList.length;
			this.getParent().updateScore();
			this.getParent().deleteAll();
		}
	},

	bulletCollide: function(){
		for(var i = 0 ; i < this.bulletList.length ; i++){
			var bullet = this.bulletList[i];
			var bpos = bullet.getPosition();
			if(this.isHit(bpos)){
 				this.deleteBullet(bullet);
				this.deleteItem();
				break;
			}
		}
	},

	isHit:function(pos){
		return (Math.abs(pos.x - this.x) <= 50 && Math.abs(pos.y - this.y) < 30);
	},

	deleteItem: function(){
		this.getParent().item = null;
		this.getParent().removeChild(this);
	},

	deleteBullet: function(bullet){
		this.getParent().removeBullet(bullet);
	}
});