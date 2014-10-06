
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













