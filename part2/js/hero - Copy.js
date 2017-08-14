(function (window) {
    function Hero(image) {
        this.initialize(image);
    }
    Hero.prototype = new Bitmap();

    Hero.prototype.Bitmap_initialize = Hero.prototype.initialize;
   
    Hero.prototype.initialize = function (image) {
       	this.reset();

        this.Bitmap_initialize(image);
        this.name = 'Hero';
        this.snapToPixel = true;
    };
    Hero.prototype.reset = function() {
    	this.velocity = {x:10,y:25};
       	this.onGround = false;
		this.doubleJump = false;
    };

	Hero.prototype.tick = function () {
		this.velocity.y += 1;


		var moveBy = {x:0, y:this.velocity.y},
			collision = null,
			collideables = Game.getCollideables();

		collision = calculateCollision(this, 'y', collideables, moveBy);

		this.y += moveBy.y;

		if ( !collision ) {
			if ( this.onGround ) {
				this.onGround = false;
				this.doubleJump = true;
			}
		} else {

			if ( moveBy.y > 0 ) {
				this.onGround = true;
				this.doubleJump = false;
			}
			this.velocity.y = 0;
		}

		moveBy = {x:this.velocity.x, y:0};
		collision = calculateCollision(this, 'x', collideables, moveBy);
		this.x += moveBy.x;
	};

    Hero.prototype.jump = function() {

		if ( this.onGround ) {
			this.velocity.y = -17;
			this.onGround = false;
			this.doubleJump = true;
//2nd jump
		} else if ( this.doubleJump ) {
			this.velocity.y = -17;
			this.doubleJump = false;
		}
	};

    window.Hero = Hero;
} (window));