var Bullet = cc.Sprite.extend({
	ctor: function(x,y,gameLayer){
		this._super();
		this.initWithFile('res/images/bullet.png');
		this.speed = 20;
		this.x = x;
		this.y = y;	
		this.gameLayer = gameLayer;
	},
	update: function(dt){
		if(this.x > 900){
			this.gameLayer.removeChild(this);
		}else{
			this.x = this.x + this.speed;
			this.setPosition(this.x,this.y);
		}
	}
});