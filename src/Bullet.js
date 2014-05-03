var Bullet = cc.Sprite.extend({
	ctor: function(x,y,atr){
		this._super();
		this.atr = atr; 
		if(this.atr == Bullet.Atr.RED)
			this.initWithFile('res/images/bullet.png');
		else
			this.initWithFile('res/images/bullet2.png')
		this.speed = 20;
		this.x = x;
		this.y = y;	
	},

	update: function(dt){
		if(this.x > screenWidth){
			this.getParent().removeBullet(this);
		}else{
			this.x = this.x + this.speed;
			this.setPosition(this.x,this.y);
		}
	}

});
Bullet.Atr = {
	RED : 1,
	BLUE : 2
}