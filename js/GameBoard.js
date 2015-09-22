GameBoard = function() {
	this.container   	 = new createjs.Container;
	// player
	this.player = {};
	// the player score text
	var playerScoreText	 = {};
	// the player score
	var playerScore 	 = {};
	this.init = function(owner) {
		// we add the player to the game and set its parameters
		this.initScore();
		this.initEventListeners(owner);
		// we init the player
		this.player = new Player();
		this.player.init(owner);
		// we init the monster factory
		// we add the container to the stage
		owner.addChild(this.container);
		this.container.on("click", this.startGame, this);
	};
	this.initEventListeners = function(owner) {
		owner.on("stagemousedown", function(e) {
			var player = this.gameBoard.player;
			// move
			if (2 == e.nativeEvent.button) {
				//TODO: fire event
				this.gameBoard.pingLocation(e);
				player.move(e);
	        } else if (0 == e.nativeEvent.button) {
	        	// shoot
				//TODO: fire event
	            player.shoot(e, this.gameBoard.container);
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
