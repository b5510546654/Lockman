var Bullet = cc.Sprite.extend({
	ctor: function(x,y,gameLayer,atr){
		this._super();
//		if(atr == undefined)
//		this.atr = this.randomAtr();
//		else
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
	}/*,

	randomAtr : function(){
		var date = new Date();
		var halfsec = Math.floor(date.getTime()/500);
		return halfsec % 2 + 1;
	}*/
});
Bullet.Atr = {
	RED : 1,
	BLUE : 2
}