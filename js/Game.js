/*
 * Shooting Game
 * Developed by Dimitar Jilanov
 * Date: 19.09.2015
 */
// we use the strict mode so the jslint return us the risky parts of our code
'use strict';
/*
	Define Canvas
*/
var Game = function() {
	// Will be linked to the canvas in our index.html page
	var canvas    = {};
	// Is the equivalent of stage in AS3 and we'll add "children" to it
	var stage     = {};
	// Preloader
	var preloader = {};
	// Credits
	var credits   = {}
	// views
	var HomeView = new createjs.Container();
	// Load Function
	this.load = function() {
		/* Link Canvas */

		canvas = document.getElementById('stage');
	  	stage = new createjs.Stage(canvas);

	  	/* Here we include the click event to be handled in the stage */
	  	stage.mouseEventsEnabled = true;

	    /* Here we activate the preloader */
		preloader = new Preloader();
		preloader.init();

		/* Here we set and init the Credits screen */
		credits = new Credits();

		/* Here we set the ticker */
		createjs.Ticker.setFPS(Config.fps);
		createjs.Ticker.addEventListener("tick", this.tick);

		/* Here we handle the events */
		this.initEventListeners();
	};

	this.tick = function() {
		stage.update();
	}

	this.initEventListeners = function(){
		EventDispacher.on(
			'NOTIFY_PRELOAD_COMPLETE',
			this.handleComplete,
			this
		);
	};

	this.handleComplete = function(event) {
		// when loading is complete show home screen
		this.showHomeView();
		// init the vital elements of the credits screen
		credits.init(stage);
		screenResize(stage);
		// we set the resize watching event
		window.addEventListener('resize', function(event){
		  screenResize(stage);
		});
	}
	// Add Title View Function

	this.showHomeView = function() {
		//console.log("Add Title View");
		var startButtonLayout = assets.startButtonLayout;
		startButtonLayout.image.set({
			x 	: startButtonLayout.x,
			y 	: startButtonLayout.y,
			name: startButtonLayout.name
		});
		var creditsButtonLayout = assets.creditsButtonLayout;
		creditsButtonLayout.image.set({
			x 	: creditsButtonLayout.x,
			y 	: creditsButtonLayout.y,
			name: creditsButtonLayout.name
		});
		var backgroundLayout = assets.background;
		backgroundLayout.image.set({
			x 	: backgroundLayout.x,
			y 	: backgroundLayout.y,
			name: backgroundLayout.name
		});
		var homeBackgroundLayout = assets.homeBackground;
		homeBackgroundLayout.image.set({
			x 	: homeBackgroundLayout.x,
			y 	: homeBackgroundLayout.y,
			name: homeBackgroundLayout.name
		});
		// we add to the container the home background, start and credits buttons
		HomeView.addChild(
			homeBackgroundLayout.image,
			startButtonLayout.image,
			creditsButtonLayout.image);
		// we add to the base screen the background image and the home screen
		stage.addChild(backgroundLayout.image, HomeView);
		// Button Listeners
		startButtonLayout.image.on("click", this.tweenHomeView, this);
		creditsButtonLayout.image.on("click", this.showCredits, this);
	};
	// show the credits screen
	this.showCredits = function() {
		credits.showCredits();
	};

	// hide home View
	this.tweenHomeView = function() {
		// slide the home view to the top
		// TODO: ADD EASEL OUT
		createjs.Tween.get(HomeView).to(
			{y: (-1 * assets.background.height)}, 800, createjs.Ease.getElasticIn(1, 0.7))
			.call(this.addGameView, [], this);
	};

	// Add Game View

	this.addGameView = function() {
		// Remove the Home View from the canvas
		stage.removeChild(HomeView);
		// Add Game View
		var gameBoard = new GameBoard();
		gameBoard.init(stage);
		// we set the game board as a global important element into the stage
		stage.gameBoard = gameBoard;
	};
	// we show the alert that the user win or lose to the screen
	this.alert = function(e) {

	};
};
