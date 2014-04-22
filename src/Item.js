var Item = cc.Sprite.extend({
	ctor: function(x,y,speed,bulletList,lockman,gameLayer){
		this._super();
		this.initWithFile('res/images/Item.png');
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.bulletList = bulletList;
		this.lockman = lockman;
		this.gameLayer = gameLayer;
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
			this.gameLayer.deleteAll();
			this.deleteItem();
		}
	},

	bulletCollide: function(){
		for(var i = 0 ; i < this.bulletList.length ; i++){
			var bullet = this.bulletList[i];
			var bpos = bullet.getPosition();
			if(this.isHit(bpos)){
				this.deleteItem();
				this.deleteBullet(bullet);
				break;
			}
		}
	},

	isHit:function(pos){
		return (Math.abs(pos.x - this.x) <= 50 && Math.abs(pos.y - this.y) < 30);
	},

	deleteItem: function(){
		this.gameLayer.removeChild(this);
		this.gameLayer.item = null;
	},

	deleteBullet: function(bullet){
		this.gameLayer.removeChild(bullet);
		this.gameLayer.removeBullet(bullet);
	}
});