var Preloader = function() {
	var preloader   = new createjs.LoadQueue();
	//preloader
	this.init = function() {
	  	preloader.installPlugin(createjs.SoundJS);
	    preloader.on("complete", this.handleComplete, this);
	    preloader.on("fileload", this.handleFileLoad, this);
	    preloader.loadManifest(Manifest);
	};

    this.handleComplete = function() {
    	// we send event to the main function that the loading is complete
		var e = new createjs.Event('NOTIFY_PRELOAD_COMPLETE');
		EventDispacher.dispatchEvent(e);
    };


	this.handleFileLoad = function(event) {
		if(event.item.type === 'image') {
			// when image is loaded we make the bitmap and save it into its assets
			var img = new Image();
			img.src = event.item.src;
			assets[event.item.id].image 	= new createjs.Bitmap(img);
			assets[event.item.id].htmlImage = img;
		} else {
			// if it sound or video we save it in the sound array
			assets.sounds[event.item.id] = event.item;
		}
	};
};
