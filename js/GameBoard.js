GameBoard = function() {
	this.container   	 = new createjs.Container;
	var playerContainer = new createjs.Container;
	// we set the player image to blank object
	var player 		 	 = {};
	// bullet line
	var bulletLine 		 = {};
	// the player image layout
	var playerLayout  	 = assets.player;
	// the player score text
	var playerScoreText	 = {};
	// the player score
	var playerScore 	 = {};
	// the sprite of the walk
	var sprite 		  	 = {};
	// the rocket
	var rocket			 = {};
	this.init = function(owner) {
		// we add the player to the game and set its parameters
		this.buildDataSheet();
		this.playerSetParameters(owner);
		this.initScore();
		this.initEventListeners(owner);

		playerContainer.addChild(player);
		playerContainer.addChild(bulletLine);
		// contains the player and the laser
		owner.addChild(playerContainer);

		owner.addChild(this.container);
		this.container.on("click", this.startGame, this);
	};
	this.initEventListeners = function(owner) {
		// will be used to handle the mouse move event
		owner.on("stagemousemove", function(e) {
			var angle = Math.atan2(e.rawY - playerContainer.y,
				e.rawX - playerContainer.x);
	        angle = angle * (180/Math.PI);
			playerContainer.rotation = 92 + Math.round(angle);
		});
		owner.on("stagemousedown", function(e) {
			// move
			if (2 == e.nativeEvent.button) {
				this.gameBoard.pingLocation(e);
				this.gameBoard.move(e);
	        } else if (0 == e.nativeEvent.button) {
	        	// shoot
	            this.gameBoard.shoot(e);
	        }
	 	});
		owner.canvas.addEventListener('contextmenu', function(e) {
	      	if (e.button === 2) {
	       		e.preventDefault();
	        	return false;
	      	}
	    }, false);
	};
	this.pingLocation = function(e) {
		var shape = new createjs.Shape;
        shape.graphics.s("#F00").ss(5).beginFill("#252729").drawCircle(0, 0, 20);
        shape.x = e.rawX;
        shape.y = e.rawY;
        shape.scaleX = 1;
        shape.scaleY = 1;
        shape.alpha = 1;
        this.container.addChild(shape);
        var tween = createjs.Tween.get(shape).to({
            scaleX: 0,
            scaleY: 0,
            alpha: 0
        }, 500).call(function(){
        	this.parent.removeChild(this);
        });
	};
	this.move = function(e) {
		// we make the player walk
		player.gotoAndPlay('walk');

		var time = 4 * (Math.abs(playerContainer.x - e.rawX) + Math.abs(playerContainer.y - e.rawY));

        var tween = createjs.Tween.get(playerContainer, {override: true}).
        to({x: e.rawX, y: e.rawY}, time).call(this.stay, [], this);
	};
	this.shoot = function(e) {
		var bullet = rocket.clone();
		var d = Math.abs(this.targetX - this.x) + Math.abs(this.targetY - this.y);
        createjs.Tween.get(this).to({
            x: this.targetX,
            y: this.targetY
        }, d).call(this.explode)
	};
	this.explode = function() {

	};
	this.playerSetParameters = function(owner) {
		// we set the player properties
		var bounds = player.getBounds();
		var canvasBounds = owner.getBounds();
        playerContainer.regX = bounds.width/2;
        playerContainer.regY = bounds.height/2;
        playerContainer.x = canvasBounds.width/2;
        playerContainer.y = canvasBounds.height/2;

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
			frames: { width: 12, height: 26, count: 4 },
			animations: {
				fly : [0, 3, 'fly']			},
			framerate: Config.walkAnimationSpeed
		};
		spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		rocket = new createjs.Sprite(spriteSheet);
		rocket.gotoAndPlay('fly');
	};
	this.stay = function() {
		player.gotoAndPlay('stay');
	};
	this.initScore = function() {
		// Build the text object that contains the score
		playerScoreLayout = assets.playerScore;
		playerScore = new createjs.Text('Total score: ' + '0', 'bold 20px Arial', '#A3FF24');
		playerScore.value = 0;
		playerScore.x = playerScoreLayout.x;
		playerScore.y = playerScoreLayout.y;
		this.container.addChild(playerScore);
	};
	this.startGame = function() {

	};
	this.increaseScore = function(score) {
		var amount = playerScore.value + score;
		playerScore.text  = 'Total score: ' + amount;
		playerScore.value = amount;
	};
	this.resetScore = function(score) {
		playerScore.text = 0;
	};

};
