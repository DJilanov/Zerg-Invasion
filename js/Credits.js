var Credits = function() {
	var creditsLayout = {};
	var credits 	  = {};
	this.owner 		  = {};
	// Init the parameters we need for the screen
	this.init = function(owner) {
		// we get the credits background image and set its parameters
		creditsLayout = assets.creditsBackground;
		credits = creditsLayout.image;
		creditsLayout.image.set({
			x 	: creditsLayout.x,
			y 	: creditsLayout.y,
			name: creditsLayout.name
		});
		this.owner = owner;
	};

	// Show credits
	this.showCredits = function() {
		this.owner.addChild(credits);
		credits.owner = this;
		createjs.Tween.get(credits).to({x:0}, 400);
		credits.on("click", this.hideCredits);
	}

	// Hide Credits
	this.hideCredits = function(e) {
		createjs.Tween.get(credits)
			.to({x: creditsLayout.x}, 400)
			.call(this.owner.rmvCredits);
	}

	// Remove Credits

	this.rmvCredits = function() {
		this.parent.removeChild(credits);
	}
}
