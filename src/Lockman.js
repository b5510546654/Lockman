var Lockman = cc.Sprite.extend({
	ctor: function(x,y){
		this._super();
		this.initWithFile('res/images/lockman.png');
		this.x = x;
		this.y = y;
	},
	moveUP: function(){
		console.log(this.x+" "+this.y);
		switch(this.y){
			case Lockman.POS.TOP:
				this.y = Lockman.POS.BOT;
			break;
			case Lockman.POS.MID:
				this.y = Lockman.POS.TOP;
			break;
			case Lockman.POS.BOT:
				this.y = Lockman.POS.MID;
			break;
		}
		this.setPosition(cc.p(this.x,this.y))
	}
});
Lockman.POS = {
	TOP: 600 * (1 / 3) + 600 * (2 / 4),
	MID: 600 * (1 / 3) + 600 * (1 / 4),
	BOT: 600 * (1 / 3)
};