/**
*  
* The Option GameObject is the gameobject use for a piece of clothing/makeup/e.t.c.
* It contains some custom code for dressup games.
* 
*/

var Option = function(state, texture, ex, ey) {
	
	Kiwi.GameObjects.Sprite.call(this, state, texture, ex, ey);

}

Kiwi.extend(Option, Kiwi.GameObjects.Sprite);


//Resets this option to the first frame.
Option.prototype.reset = function() {
	this.cellIndex = 0;
}


//Makes the element go to the next frame.
//This would be when a user wants to go to the next clothing item, e.t.c.
Option.prototype.next = function() {
	this.animation.nextFrame();
}


//Makes the element go to the previous frame
//This would be when a user wants to go to the previous clothing item.
Option.prototype.prev = function() {
	this.animation.prevFrame();
}


//Choose a random piece of clothing.
Option.prototype.randomize = function() {

	this.cellIndex = this.game.rnd.integerInRange( 0, this.animation.length );

}




/**
* The Loading State is used to load in all of the GLOBAL in-game assets that we need in game.
* GLOBAL assets are the type of assets that we want to always be in the game, because they are used so often.
*
*/



/**
* Since we want to use the custom Kiwi.JS loader with the bobing kiwi/html5 logo. We need to extend the KiwiLoadingScreen State.  
* The KiwiLoadingScreen State is an extentsion of a normal State but it has some custom code to handle the loading/bobbing/fading of all the items, so if you override a method (like the preload) for example just make sure you call the super method.
* 
* The parameters we are passing into this method are as ordered.
* 1 - name {String} Name of this state.
* 2 - stateToSwitch {String} Name of the state to switch to AFTER all the assets have loaded. Note: The state you want to switch to should already have been added to the game.
* 3 - subfolder {String} The folder that the loading graphics are located at. 
*/
var MainLoader = new KiwiLoadingScreen('MainLoader', 'MainMenu', 'assets/img/loading/');

/**
* This preload method is responsible for preloading all of our in game assets.
* Each time this state is switched to, it will attempt to load in these graphics
*
* @method preload
*/
MainLoader.preload = function () {

    //Make sure to call the super at the top.
    //Otherwise the loading graphics will load last, and that defies the whole point in loading them. 
    KiwiLoadingScreen.prototype.preload.call(this);


    //Load in all of the generic buttons.
    this.addSpriteSheet('cameraBtn', 'assets/img/buttons/cameraBtn.png', 100, 100);
    this.addSpriteSheet('randomBtn', 'assets/img/buttons/randomBtn.png', 100, 100);
    this.addSpriteSheet('resetBtn', 'assets/img/buttons/resetBtn.png', 100, 100);

    this.addSpriteSheet('nextBtn', 'assets/img/buttons/nextBtn.png', 63, 63);
    this.addSpriteSheet('prevBtn', 'assets/img/buttons/prevBtn.png', 63, 63);

    this.addSpriteSheet('backBtn', 'assets/img/buttons/backBtn.png', 100, 100);
    this.addSpriteSheet('printBtn', 'assets/img/buttons/printBtn.png', 100, 100);
    this.addSpriteSheet('saveBtn', 'assets/img/buttons/saveBtn.png', 100, 100);

    //Load in the main menu assets 

    //Load in the 'spinner' assets, which are displayed whilst loading is happening on the Play State.
    this.addImage('spinnerBackground', 'assets/img/spinner/spinnerSquare.png');
    this.addImage('spinner', 'assets/img/spinner/spinner.png');


}











/**
* 
* The MainMenu State is as its name suggests, the state for the main menu of the game.
* In this state we are just going to have a link to 'start/play' the game,
* but here would you add all other main menu functionality, like viewing leaderboards.
* 
* Or in the case of a Dressup game, perhaps a way to view how others have dressed-up a particular character?
* 
*/

var MainMenu = new Kiwi.State('MainMenu');


MainMenu.create = function () {

	this.game.stage.color = 'fff';

    //This state is currently skipped, but can be used as a main menu page.
    this.game.states.switchState("Play");

}

/**
* 
* The Play State is the state handles the majority of the in-game logic. 
* In the case of the Dressup Game, the logic this would handle is anything to do with, 
* - Switching between items of clothing/makeup/e.t.c.
* - Taking screenshots.
* - Randomisation of clothing/e.t.c.
* 
*/
var Play = new Kiwi.State('Play');


/**
* 
* We are going to use the preload method on this state to load all the assets that we need in this particular state.
* The reason we have not added them to the MainLoader is because these assets we do not want to be GLOBAL, 
* but instead only want them to be there whilst this state is active, and then go away (to save memory).
* 
*/
Play.preload = function() {

    //Load in all of the body parts. Make sure that you set the 'storeAsGlobal' flag to 'false'
    this.addSpriteSheet('head', 'assets/img/character/head.png', 150, 117, false);
    this.addSpriteSheet('chest', 'assets/img/character/chest.png', 150, 117, false);
    this.addSpriteSheet('arms', 'assets/img/character/arms.png', 150, 117, false);
    this.addSpriteSheet('legs', 'assets/img/character/legs.png', 150, 117, false);

    //Create spinner
    this.createLoader();

}


//Creates the loader. This should happen at the preload stage
Play.createLoader = function() {
    this.spinnerBackground = new Kiwi.GameObjects.StaticImage(this, this.textures.spinnerBackground);
    this.addChild(this.spinnerBackground);

    this.spinner = new Kiwi.GameObjects.StaticImage(this, this.textures.spinner);
    this.addChild(this.spinner);

    this.spinnerBackground.x = (this.game.stage.width - this.spinnerBackground.width) * 0.5;
    this.spinner.x = (this.game.stage.width - this.spinner.width) * 0.5;

    this.spinnerBackground.y = (this.game.stage.height - this.spinnerBackground.height) * 0.5;
    this.spinner.y = (this.game.stage.height - this.spinner.height) * 0.5;
}


//The 'loadUpdate' is executed as the update loop, dur
Play.loadUpdate = function() {

    //Spin the spinner
    this.spinner.rotation += Math.PI / 6;

}


//Removes the loader. This will happen at the create state, after all the assets have been loaded.
Play.removeLoader = function() {
    this.spinnerBackground.exists = false;
    this.spinner.exists = false;
    this.spinnerBackground = null;
    this.spinner = null;
}


//Executed once all the game assets have been loaded. 
//In charge of remove the loader, and setting up the game 
Play.create = function () {

    //Remove the loader
    this.removeLoader();

    //Create the dressup elements
    this.createDressup();

    //Create the buttons to deal with game options
    this.createButtons();
}



//Handles the creation of the dressup items
Play.createDressup = function() {

    //Create the background. 
    //In this example we do not have a background, so we will skip this step.


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];

    this.dressUpElements.push(new Option(this, this.textures.legs, 100, 80));
    this.dressUpElements.push(new Option(this, this.textures.chest, 100, 80));  
    this.dressUpElements.push(new Option(this, this.textures.arms, 100, 80));
    this.dressUpElements.push(new Option(this, this.textures.head, 100, 80));

    this.buttons = [];

    var btnBotY = (this.dressUpElements.length - 1) * 70;

    //Now we loop through the dress up parts and create buttons for each, and add them
    for(var i = 0; i < this.dressUpElements.length; i++) {

        var item = this.dressUpElements[i];

        var nextBtn = new Kiwi.GameObjects.Sprite(this, this.textures.nextBtn, 273, btnBotY - 70 * i);
        nextBtn.input.onUp.add(item.next, item);
        this.buttons.push(nextBtn);

        var prevBtn = new Kiwi.GameObjects.Sprite(this, this.textures.prevBtn, 0, btnBotY - 70 * i);
        prevBtn.input.onUp.add(item.prev, item);
        this.buttons.push(prevBtn);

        this.addChild(nextBtn);
        this.addChild(prevBtn);
        this.addChild(item);
    }

}



//Holds the main code for dealing with the 'global' generic buttons
Play.createButtons = function() {

    //Create the 'random' button with an event listener for when it is clicked
    this.randomButton = new Kiwi.GameObjects.Sprite(this, this.textures.randomBtn, 0, 289);
    this.addChild(this.randomButton);
    this.randomButton.input.onUp.add(this.randomizeCharacter, this);
    

    //Create the 'reset' button with an event listener for when it is clicked
    this.resetButton = new Kiwi.GameObjects.Sprite(this, this.textures.resetBtn, 118, 289);
    this.addChild(this.resetButton);
    this.resetButton.input.onUp.add(this.resetCharacter, this);
    

    //Create the 'camera' button with an event listener for when it is clicked
    this.showButton = new Kiwi.GameObjects.Sprite(this, this.textures.cameraBtn, 235, 289);
    this.addChild(this.showButton);
    this.showButton.input.onUp.add(this.showCharacter, this);
}



// Randomize character based on the amount of frames each dress up element has.
Play.randomizeCharacter = function () {
    
    //Loop through the dressup elements and call the randomise method
    for(var i = 0; i < this.dressUpElements.length; i++) {
        this.dressUpElements[i].randomize();

    }


}



//Set all dress up element animations to their first frame (which is the default).
Play.resetCharacter = function () {

    //Loop through the dressup elements and call the randomise method
    for(var i = 0; i < this.dressUpElements.length; i++) {
        this.dressUpElements[i].reset();

    }

}


// Remove all dress up navigation and give print and save options. 
Play.showCharacter = function () {

}














/**
* The 'show' state is the state that is used when the user wants to 'print out' or 'save' their person.
*
* The difference between this state and the 'play' state is that this one doesn't contain next/previous buttons.
* 
*/

var ShowState = new Kiwi.State('ShowState');


/**
* This create method is executed when the Kiwi game changes to the show state.
* 
* @method create
* @param characterParts{object} The characterParts containing any dress up information
* @private
*/
ShowState.create = function (characterParts) {

    //Is the character being printed out?
    this.printing = false;
    this.capturing = false;

    //Get the character parts
    this.characterParts = characterParts;

    if (characterParts != undefined) {
        
        //Loop through the parts and show them onscreen.
        for (var i in characterParts) {
            this[i] = new Kiwi.GameObjects.Sprite(this, this.textures[i], 100, 80);
            this.addChildAt(this[i], 0);
            this[i].animation.switchTo(characterParts[i]);
        }

    }

    //Display the print button
    this.printButton = new Kiwi.GameObjects.Sprite(this, this.textures.PrintBtn, 0, 289);
    this.addChild(this.printButton);
    this.printButton.input.onUp.add(this.printImg, this);

    //Display the save button
    this.saveButton = new Kiwi.GameObjects.Sprite(this, this.textures.SaveBtn, 118, 289);
    this.addChild(this.saveButton);
    this.saveButton.input.onUp.add(this.saveImg, this);

    //Display the back button
    this.backButton = new Kiwi.GameObjects.Sprite(this, this.textures.BackBtn, 235, 289);
    this.addChild(this.backButton);
    this.backButton.input.onUp.add(this.goBack, this);
}


/**
* This method is executed when the print button was clicked.
* Hides the buttons and sets the printing to true.
* 
*/
ShowState.printImg = function () {
    this.printButton.visible = false;
    this.saveButton.visible = false;
    this.backButton.visible = false;

    this.printing = true;
}


/**
* This method is executed when the print button was clicked.
* Hides the buttons and sets the capturing to true.
* 
*/
ShowState.saveImg = function () {
    this.printButton.visible = false;
    this.saveButton.visible = false;
    this.backButton.visible = false;

    this.capturing = true;
}


/**
* The post render method is executed immediately after the stage has been rednered. 
* 
* We need this otherwise when it comes to 'saving' the canvas the buttons will still be visible (which we don't want).
*
*/
ShowState.postRender = function () {

    //Did the user want to print the stage?
    if (this.printing) {

        //Convert the canvas to an Image.
        var dataUrl = this.game.stage.canvas.toDataURL();

        //Create the new windows HTML.
        var windowContent = '<!DOCTYPE html>';
        windowContent += '<html>'
        windowContent += '<head><title>Your Dress Up</title></head>';
        windowContent += '<body>'
        windowContent += '<img src="' + dataUrl + '">';
        windowContent += '</body>';
        windowContent += '</html>';

        //Open that 'html' in a new window.
        var printWin = window.open('', '', 'width=1280,height=960');
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();

        //Focus that window and print.
        printWin.focus();
        printWin.print();
        printWin.close();

        //Show UI again.
        this.printButton.visible = true;
        this.saveButton.visible = true;
        this.backButton.visible = true;
        this.printing = false;
    }

    //Did the user want to 'save' the canvas.
    if (this.capturing) {

        //Get the canvas information
        var img = this.game.stage.canvas.toDataURL("image/octet-stream");
        
        //Open it up in a new window.
        window.open(img, "toDataURL() image", "width=1280, height=960");

        //Show UI again.
        this.printButton.visible = true;
        this.saveButton.visible = true;
        this.backButton.visible = true;
        this.capturing = false;
    }
}


/**
* Is executed when the user wants to go back to the 'play' state.
* 
*/
ShowState.goBack = function () {
    game.states.switchState("PlayState", PlayState, null, { characterParts: this.characterParts });
}




/**
* The core Dress-up blueprint game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game ,
* add all of the relevant states to that Game,
* and then choose which one to load first.
*/


//Initialise the Kiwi Game. 

/*
* 'content' is the id of the element the game is going to be place inside of.
* 'DressUpBlueprint' is the name of the game.
*/
var game = new Kiwi.Game('content', 'DressUpBlueprint');


//Add all the States we are going to use.
game.states.addState(MainLoader);
game.states.addState(MainMenu);
game.states.addState(Play);


//Switch to/use the Preloader state. 
game.states.switchState("MainLoader");