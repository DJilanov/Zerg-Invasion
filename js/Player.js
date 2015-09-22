var Player = function() {
	this.playerContainer = new createjs.Container;
	// we set the player image to blank object
	var player 		 	 = {};
	// bullet line
	var bulletLine 		 = {};
	// the player image layout
	var playerLayout  	 = assets.player;
	// the sprite of the walk
	var sprite 		  	 = {};
	// the rocket
	var rocket			 = {};
	// the explosion
	var explosion 	 	 = {};
	this.init = function(owner) {
		this.buildDataSheet();
		this.playerSetParameters(owner);
		this.initEventListeners(owner);
		this.playerContainer.addChild(player);
		this.playerContainer.addChild(bulletLine);
		// contains the player and the laser
		owner.addChild(this.playerContainer);
	};
	this.initEventListeners = function(owner) {
		// will be used to handle the mouse move event
		owner.on("stagemousemove", function(e, containers) {
			var angle = Math.atan2(e.rawY - containers.playerContainer.y,
				e.rawX - containers.playerContainer.x);
	        angle = angle * (180/Math.PI);
			containers.playerContainer.rotation = 92 + Math.round(angle);
		}, null, false, {playerContainer: this.playerContainer});
	};
	this.move = function(e) {
		// we make the player walk
		player.gotoAndPlay('walk');

		var time = Config.movementSpeed * (Math.abs(this.playerContainer.x - e.rawX) + Math.abs(this.playerContainer.y - e.rawY));

        var tween = createjs.Tween.get(this.playerContainer, {override: true}).
        to({x: e.rawX, y: e.rawY}, time).call(this.stay, [], this);
	};
	this.shoot = function(e, container) {
		var bullet = rocket.clone();
		bullet.x = this.playerContainer.x;
		bullet.y = this.playerContainer.y;
		bullet.rotation = this.playerContainer.rotation;
		container.addChild(bullet);
		var absX = Math.abs(e.rawX - this.playerContainer.x);
		var absY = Math.abs(e.rawY - this.playerContainer.y);
		// bad fix of the issue when the direct top line does lower dg
		if(absX < 100) {
			absX = 100;
		}
		if((absX < 100)&&(absY < 100)) {
			absX = 10;
			absY = 10;
		}
		var time = Config.rocketSpeed * (absX + absY);
        createjs.Tween.get(bullet).to({
            x: e.rawX,
            y: e.rawY
        }, time).call(this.explode, [container, bullet], this);
	};
	this.explode = function(container, bullet) {
		container.removeChild(bullet);
		var explode = explosion.clone();
		var explodeBounds = explode.getBounds();
		explode.x = bullet.x - explodeBounds.width/2;
		explode.y = bullet.y - explodeBounds.height/2;
		explode.gotoAndPlay('explode');
		explode.on('animationend', function(e) {
			// we destroy the sprite
        	this.parent.removeChild(e.target);
    	});
		container.addChild(explode);
	};
	this.playerSetParameters = function(owner) {
		// we set the player properties
		var bounds = player.getBounds();
		var canvasBounds = owner.getBounds();
        this.playerContainer.regX = bounds.width/2;
        this.playerContainer.regY = bounds.height/2;
        this.playerContainer.x = canvasBounds.width/2;
        this.playerContainer.y = canvasBounds.height/2;

        bulletLine = new createjs.Shape;
        bulletLine.graphics.beginLinearGradientFill(
        	["#252729", "red"], [0, 1], 0, -550, 1, 500)
        	.drawRect(0, -500, 1, 500);
        bulletLine.x = bounds.width/4;

	};
	this.buildDataSheet = function() {
		var spriteSheetData = {
			images: [
				assets.player.htmlImage
			],
			frames: { width: 53, height: 63, count: 8 },
			animations: {
				walk : [0, 7, 'walk'],
				stay: [0]
			},
			framerate: Config.walkAnimationSpeed
		};
		var spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		player = new createjs.Sprite(spriteSheet);
		player.gotoAndPlay('stay');

		spriteSheetData = {
			images: [
				assets.rocket.htmlImage
			],
			frames: { width: 26, height: 49, count: 4 },
			animations: {
				fly : [0, 3, 'fly']			},
			framerate: Config.walkAnimationSpeed
		};
		spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		rocket = new createjs.Sprite(spriteSheet);
		rocket.gotoAndPlay('fly');

		spriteSheetData = {
			images: [
				assets.explosion.htmlImage
			],
			frames: { width: 128, height: 128, count: 40 },
			animations: {
				boom : [0, 39]
			},
			framerate: Config.walkAnimationSpeed
		};
		spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		explosion = new createjs.Sprite(spriteSheet);
	};
	this.stay = function() {
		player.gotoAndPlay('stay');
	};
};
