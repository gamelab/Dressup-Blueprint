/**
* The Loading State is going to be used to load in all of the in-game assets that we need in game.
*
* Because in this blueprint the user can only 'dress-up' a single "character" we are going to load in all of 
* the asset's at this point.
*
* If you have multiple states however, I would recommend have loading the other graphics as they are required by their states, 
* Otherwise the loading times maybe a bit long. 
*
*/

var LoadingState = new Kiwi.State('LoadingState');

/**
* This preload method is responsible for preloading all of our in game assets.
*
* @method preload
*/
LoadingState.preload = function () {

    //Load in the chest/head graphics
    this.addSpriteSheet('head', 'assets/img/head.png', 150, 117);
    this.addSpriteSheet('chest', 'assets/img/chest.png', 150, 117);
    this.addSpriteSheet('arms', 'assets/img/arms.png', 150, 117);
    this.addSpriteSheet('legs', 'assets/img/legs.png', 150, 117);

    //Load in the Buttons we require
    this.addSpriteSheet('CameraBtn', 'assets/img/buttons/CameraBtn.png', 100, 100);
    this.addSpriteSheet('RandomBtn', 'assets/img/buttons/RandomBtn.png', 100, 100);
    this.addSpriteSheet('ResetBtn', 'assets/img/buttons/ResetBtn.png', 100, 100);

    this.addSpriteSheet('NextBtn', 'assets/img/buttons/NextBtn.png', 63, 63);
    this.addSpriteSheet('PrevBtn', 'assets/img/buttons/PrevBtn.png', 63, 63);

    this.addSpriteSheet('BackBtn', 'assets/img/buttons/BackBtn.png', 100, 100);
    this.addSpriteSheet('PrintBtn', 'assets/img/buttons/PrintBtn.png', 100, 100);
    this.addSpriteSheet('SaveBtn', 'assets/img/buttons/SaveBtn.png', 100, 100);

    /**
    * Create our Background Image and any assets that we want to display to the user as the game is loading.
    * Also adds a on-click event.
    */
    this.bg = new Kiwi.GameObjects.Sprite(this, this.textures.kiwiImg, 390, 280);
    this.addChild(this.bg);
    
    this.bg.input.onUp.add(this.pressIntro);
};


/**
* This create method is executed when the Kiwi game enters the loading state after all the assets have been loaded.
* At this point we can switch to our 'intro' state.

* @method create
*
*/
LoadingState.create = function () {

    game.states.switchState("IntroState");

};


/**
* This method is executed if the user clicks on the screen as the graphics are loading.
* Will make the browser go our website!
* @method create
* @private 
*/
LoadingState.pressIntro = function () {
    window.open("http://www.kiwijs.org");
}


/*
* If you want to include a 'process' or a loading graphic telling the user how many bytes/files/e.t.c are being loaded
* Then you can make use of the 'loadProgress' method. 
*/
LoadingState.loadProgress = function (percent, bytesLoaded, file) {
  
}
