var PlayState = new Kiwi.State('PlayState');


/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* When this state is switched to a 'characterParts' parameter will be passed.
* If passed this parameter will contains a number for a particular 'part' (Arm/Leg/Torso/e.t.c) that should be used. 
*
* 
* @method create
* @param characterParts{Object} The list of character parts with corresponding variables.
* @private
*/
PlayState.create = function (characterParts) {

    //Get the character parts and store them in a property to be used later on.
    this.characterParts = characterParts;


    /**
    * Automatically generated cycle button positioning variables.
    */
    var leftButtonX = 0;
    var rightButtonX = 273;
    var buttonGapY = 70;
    var yDiff = 0;


    if (characterParts != undefined) {


        //Loop through the parts that were passed.
        for (var i in characterParts) {

            /*
            * Add dress up elements dynamically via characterParts.
            *
            * Note: The texture for the particular dress up element we are creating (in this case) has the excat same name as the element itself.  
            * Also we are always going to add the dress up elements at the bottom. That way the first elements added will be at the top.
            */
            this[i] = new Kiwi.GameObjects.Sprite(this, this.textures[i], 100, 80);
            this.addChildAt(this[i], 0);
            this[i].name = i;
            this[i].animation.switchTo(characterParts[i]);
            

            //Create a new left button that we will use to cycle to the previous part of the type we just generated.
            this[i + 'LeftBtn'] = new Kiwi.GameObjects.Sprite(this, this.textures.PrevBtn, leftButtonX, yDiff);
            this.addChild(this[i + 'LeftBtn']);
            this[i + 'LeftBtn'].tag = i;        //Store which element this left button is for.
            this[i + 'LeftBtn'].input.onUp.add(this.pressLeft, this);


            //Create a new right button that we will use to cycle to the next part of the type we just generated. 
            this[i + 'RightBtn'] = new Kiwi.GameObjects.Sprite(this, this.textures.NextBtn, rightButtonX, yDiff);
            this.addChild(this[i + 'RightBtn']);
            this[i + 'RightBtn'].tag = i;       //Store which element this right button is for
            this[i + 'RightBtn'].input.onUp.add(this.pressRight, this);

            yDiff += buttonGapY;

        }

    }


    //Create the 'random' button with an event listener for when it is clicked
    this.randomButton = new Kiwi.GameObjects.Sprite(this, this.textures.RandomBtn, 0, 289);
    this.addChild(this.randomButton);
    this.randomButton.input.onUp.add(this.randomizeCharacter, this);
    

    //Create the 'reset' button with an event listener for when it is clicked
    this.resetButton = new Kiwi.GameObjects.Sprite(this, this.textures.ResetBtn, 118, 289);
    this.addChild(this.resetButton);
    this.resetButton.input.onUp.add(this.resetCharacter, this);
    

    //Create the 'camera' button with an event listener for when it is clicked
    this.showButton = new Kiwi.GameObjects.Sprite(this, this.textures.CameraBtn, 235, 289);
    this.addChild(this.showButton);
    this.showButton.input.onUp.add(this.showCharacter, this);
}


/**
* Updates all of the characters frames via the characterParts variables.
* Used when a clicks on a dress-up element and so whole character updates. 
*
* @method updateCharacter
* @public
* 
*/
PlayState.updateCharacter = function () {
    for (var i in this.characterParts) {
        this[i].animation.switchTo( this.characterParts[i] );
    }
}


/**
* This method gets executed when the user clicks on a 'left' button. 
* So they want a dress-up element to go to its 'previous' frame.
*
* @method pressLeft
* @public
*/

PlayState.pressLeft = function (piece) {

    //Get the name of the dress-up element we want to go next.
    var clip = this[piece.tag];
    
    //Updates the relevant character part with the new frame
    if (clip.animation.frameIndex == 0) {
        this.characterParts[piece.tag] = clip.animation.currentAnimation.length - 1;
    } else {
        this.characterParts[piece.tag]--;
    }

    //Update the character
    this.updateCharacter();
}

/**
* This method gets executed when the user clicks on a 'right' button. 
* So they want a dress-up element to go to its 'next' frame.
*
* @method pressRight
* @public
* 
*/

PlayState.pressRight = function (piece) {

    //Get the name of the dress-up element we want to go next.
    var clip = this[piece.tag];

    //Updates the relevant character part with the new frame
    if (clip.animation.frameIndex == (clip.animation.currentAnimation.length - 1)) {
        this.characterParts[piece.tag] = 0;
    } else {
        this.characterParts[piece.tag]++;
    }

    //Update the character
    this.updateCharacter();
}


/**
* Randomize character based on the amount of frames each dress up element has.
* 
* @method randomizeCharacter
* @public
*/
PlayState.randomizeCharacter = function () {
    for (var i in this.characterParts) {
        var clip = this[i];
        var r = Math.floor(Math.random() * clip.animation.currentAnimation.length);
        this.characterParts[i] = r;
    }
    this.updateCharacter();
}


/**
* Set all dress up element animations to their first frame (which is the default).a
*
* @method resetCharacter
* @public 
*/
PlayState.resetCharacter = function () {
    for (var i in this.characterParts) {
        this.characterParts[i] = 0;
    }
    this.updateCharacter();
}


/**
* Remove all dress up navigation and give print and save options. 
* These functionalities are stored on the 'show' state. 
*
* @method showCharacter
* @public
*/
PlayState.showCharacter = function () {
    game.states.switchState("ShowState", ShowState, null, { characterParts: this.characterParts });
}