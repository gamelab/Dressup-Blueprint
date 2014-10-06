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


