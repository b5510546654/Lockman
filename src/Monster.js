var Monster = cc.Sprite.extend({
	ctor: function(x,y){
		this._super();
		this.initWithFile('res/images/monster.png');
		this.speed = 5;
	},
	update: function(dt){
		var posx = this.getPositionX();
		if(posx < -50){
			
		}
		else
			this.setPositionX(this.getPositionX()-this.speed);
	}
});