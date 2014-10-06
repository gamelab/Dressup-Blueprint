/**
* The preload state is used purely to load all files required by the loader.
* 
* E.g. Any loading gifs/background graphics that are displayed to the user 'in-game' while they are waiting for the game to load.
*/


//Create the Preload State
var Preloader = new Kiwi.State('Preloader');


//Load in the Preloading Graphic.
Preloader.preload = function () {
	 
    this.addImage('kiwiImg', 'assets/img/loadingImage.png');

};


/* 
* Once the graphic has been loaded, switch to the Loading State 
* which will handle the Loading of all other in-game assets.
*/
Preloader.create = function () {

	//Resize the game stage to the correct size.
    game.stage.resize(340, 400);
    game.states.switchState("LoadingState");

};

