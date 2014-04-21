var Item = cc.Sprite.extend({
	ctor: function(x,y,speed){
		this._super();
		this.initWithFile('res/images/Item.png');
		this.speed = speed;
		this.x = x;
		this.y = y;
	},

	update: function(dt){
			this.x = this.getPositionX() - this.speed;
			this.setPositionX(this.x);
	}

});