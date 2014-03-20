var Bullet = cc.Sprite.extend({
	ctor: function(x,y,gameLayer){
		this._super();
		this.atr = this.randomAtr();
		if(this.atr == Bullet.Atr.RED)
			this.initWithFile('res/images/bullet.png');
		else
			this.initWithFile('res/images/bullet2.png')
		this.speed = 20;
		this.x = x;
		this.y = y;	
		this.gameLayer = gameLayer;
	},
	ctor: function(x,y,gameLayer,atr){
		console.log("FD");
		this._super();
		if(atr == undefined)
			this.atr = this.randomAtr();
		else
			this.atr = atr;
		if(this.atr == Bullet.Atr.RED)
			this.initWithFile('res/images/bullet.png');
		else
			this.initWithFile('res/images/bullet2.png')
		this.speed = 20;
		this.x = x;
		this.y = y;	
		this.gameLayer = gameLayer;
	},
	update: function(dt){
		if(this.x > 900){
			this.gameLayer.removeChild(this);
			this.gameLayer.deleteBullet(this);
		}else{
			this.x = this.x + this.speed;
			this.setPosition(this.x,this.y);
		}
	},
	randomAtr : function(){
		var random = Math.ceil(Math.random()*2);
		return random;
	}
});
Bullet.Atr = {
	RED : 1,
	BLUE : 2
}