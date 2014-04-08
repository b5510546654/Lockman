var RedButton = cc.Sprite.extend({
	ctor : function(x,y){
		this._super();
		this.initWithFile('res/images/red1.png');
		this.movingAction = this.createAnimationAction();
		this.runAction(this.movingAction);
	},
	
	createAnimationAction: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/red1.png' );
		animation.addSpriteFrameWithFile( 'res/images/red2.png' );
		console.log( animation.getDelayPerUnit() );
		animation.setDelayPerUnit( 0.5 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

    stop: function(){
    	this.stopAction(this.movingAction);
    },

})