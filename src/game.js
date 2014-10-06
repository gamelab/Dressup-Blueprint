
/**
* The core Dress-up blueprint game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game ,
* add all of the relevant states to that Game,
* and then choose which one to load first.
*/


//Create some gameoptions
var gameoptions = {
	width: 340,
	height: 400
}


//Initialise the Kiwi Game. 

/*
* 'content' is the id of the element the game is going to be place inside of.
* 'DressUpBlueprint' is the name of the game.
*/
var game = new Kiwi.Game('content', 'DressUpBlueprint', null, gameoptions);


//Add all the States we are going to use.
game.states.addState(MainLoader);
game.states.addState(MainMenu);
game.states.addState(Play);


//Switch to/use the Preloader state. 
game.states.switchState("MainLoader");