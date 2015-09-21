GameBoard = function() {
	this.container   	 = new createjs.Container;
	// we set the player image to blank object
	var player 		 	 = {}
	// the player image layout
	var playerLayout  	 = assets.player;
	// the player score text
	var playerScoreText	 = {};
	// the player score
	var playerScore 	 = {};
	// the sprite of the walk
	var sprite 		  	 = {};
	this.init = function(owner) {
		// we add the player to the game and set its parameters
		this.buildDataSheet();
		this.playerSetParameters(owner);
		this.initScore();
		this.initEventListeners(owner);
		this.container.addChild(player);
		owner.addChild(this.container);
		this.container.on("click", this.startGame, this);
	};
	this.initEventListeners = function(owner) {
		// will be used to handle the mouse move event
		owner.on("stagemousemove", function(e) {
			var mouseCoords = this.globalToLocal(this.mouseX, this.mouseY);
			var x = mouseCoords.x;
			var y = mouseCoords.y;
			var angle = Math.atan2(this.mouseY - (player.y + player.regY),
				this.mouseX - (player.x + player.regX));
	        angle = angle * (180/Math.PI);
	        console.log(angle);
			player.rotation = 90 + Math.round(angle);
		});
	};
	this.playerSetParameters = function(owner) {
		// we set the player properties
		var bounds = player.getBounds();
		var canvasBounds = owner.getBounds();
        player.regX = bounds.width/2;
        player.regY = bounds.height/2;
        player.x = canvasBounds.width/2;
        player.y = canvasBounds.height/2;
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
			framerate: Config.fps
		};
		var spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		player = new createjs.Sprite(spriteSheet);
		player.gotoAndPlay('stay');
	};
	this.stay = function() {
		player.gotoAndPlay('stay');
	};
	this.move = function() {
		player.gotoAndPlay('walk');
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
