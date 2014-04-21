var Item = cc.Sprite.extend({
	ctor: function(speed){
		this.initWithFile('res/images/bullet.png');
		this.speed = speed;
	},

	update: function(dt){
			this.x = this.getPositionX() - this.speed;
			this.setPositionX(this.x);
	}

});