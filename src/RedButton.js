var RedButton = cc.Sprite.extend({
	ctor : function(x,y){
		this._super();
		this.number = 1;
		this.initWithFile('res/images/red1.png');
		this.movingAction = this.createAnimationAction();
		this.runAction(this.movingAction);
		setInterval(this.intervalNumber,500);
	},
	intervalNumber: function(){
		console.log(this.number);
		if(this.number == 1){
			this.number = 2;
		}
		else{
			this.number = 1;
		}
	},
	getNumber: function(){
		console.log(this.number);
		return this.number;
	},
	createAnimationAction: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/red1.png' );
		animation.addSpriteFrameWithFile( 'res/images/red2.png' );
		console.log( animation.getDelayPerUnit() );
		animation.setDelayPerUnit( 0.5 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    }
})