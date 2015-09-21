function screenResize(stage) {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	if(windowHeight > windowWidth) {
		alert('Show orientation dialog');
	}
	var nativeWidth = assets.background.width;
	var nativeHeight = assets.background.height;
	var scaleX = windowWidth / nativeWidth;
	var scaleY = windowHeight / nativeHeight;
	var scaleSize = Math.min(scaleX, scaleY);

	var width = nativeWidth * scaleSize;
	var height = nativeHeight * scaleSize;
	// this automatically sets the values to integers to avoid sub-pixel division
	stage.canvas.width = width;
	stage.canvas.height = height;
	stage.scaleX = scaleSize;
	stage.scaleY = scaleSize;
}
