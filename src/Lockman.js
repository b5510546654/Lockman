var Lockman = cc.Sprite.extend({
	ctor : function(x,y){
		this._super();
		this.initWithFile('res/images/red1.png');
		this.movingAction = this.createAnimationAction();
		this.runAction(this.movingAction);
		this.x = x;
		this.y = y;
	},
	
	createAnimationAction: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/lockman.png' );
		animation.addSpriteFrameWithFile( 'res/images/lockman2.png' );
		console.log( animation.getDelayPerUnit() );
		animation.setDelayPerUnit( 0.5 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

    moveUP: function(){
		switch(this.y){
			case Lockman.POS.MID:
				this.y = Lockman.POS.TOP;
				break;
			case Lockman.POS.BOT:
				this.y = Lockman.POS.MID;
				break;
		}
		this.setPositionY(this.y);
	},

	moveDOWN: function(){
		switch(this.y){
			case Lockman.POS.TOP:
				this.y = Lockman.POS.MID;
			break;
			case Lockman.POS.MID:
				this.y = Lockman.POS.BOT;
			break;
		}
		this.setPositionY(this.y);
	}
});
Lockman.POS = {
	TOP: 600 * (1 / 3) + 600 * (2 / 4),
	MID: 600 * (1 / 3) + 600 * (1 / 4),
	BOT: 600 * (1 / 3)
};