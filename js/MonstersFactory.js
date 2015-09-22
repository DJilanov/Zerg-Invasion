var MonstersFactory = function() {
	this.monstersArray = {
		monsters: [
	    	// will be filled by monsters
		]
	};
	this.makeMonster = function() {
		var width 	= assets.background.width;
		var height  = assets.background.height;
		var monster = Math.floor((Math.random() * assets.monsters.length) + 1);
		var image   = assets.monsters.image.clone();
		image.sourceRect({
			x	  : monster * assets.monsters.width,
			y	  : 0,
			width : assets.monsters.width,
			height: assets.monsters.height
		});
		image.x 	   = Math.floor((Math.random() * width) + 1);
		image.y 	   = Math.floor((Math.random() * height) + 1);
		image.type 	   = 'type' + monster;
		image.live 	   = true;
		image.onScreen = false;
		// save the new monster on the first free slot
		var array = this.monstersArray.monsters;
		array[array.length] = image;
	};
	this.removeMonster = function() {
		var array 	= this.monstersArray.monsters;
		var index 	= Math.floor((Math.random() * array.length) + 1);
		var monster = array[monster];
		if((monster.live === true)&&(monster.onScreen === true)){
			console.log('Show skull');
		} else {
			console.log('Remove ' + index);
			console.log('Array before ' + array);
			for(var arrayIndex = index; arrayIndex < array.length -1; arrayIndex++) {
				array[arrayIndex] = array[arrayIndex + 1];
			}
			array[array.length] = undefined;
			console.log('Array after ' + array);
		}
	};
	this.killMonster = function(index) {
		var array = this.monstersArray.monsters;
		array[index].live = false;
		console.log('stop it from moving in screen');
	};
};
