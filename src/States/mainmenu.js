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

	//Text to start
	this.titleGameText = new Kiwi.GameObjects.Textfield(this, 'Dress up Blueprint', this.game.stage.width * 0.5, this.game.stage.height * 0.5 - 40, '#fff', 26, 'bold');
	this.startGameText = new Kiwi.GameObjects.Textfield(this, 'CLICK TO BEGIN', this.game.stage.width * 0.5, this.game.stage.height * 0.5 + 5, '#fff', 12, 'bold');
	

	this.titleGameText.textAlign = 'center';
	this.startGameText.textAlign = 'center';

	//Icon
	this.kiwi = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName);
	this.kiwi.y = 10;
	this.kiwi.x = this.game.stage.width - this.kiwi.width - 10;


	this.addChild(this.kiwi);
	this.addChild(this.titleGameText);
	this.addChild(this.startGameText);

	this.game.input.onUp.addOnce(this.startGame, this);

}


MainMenu.startGame = function() {

	this.game.stage.color = 'fff';
    //This state is currently skipped, but can be used as a main menu page.
    this.game.states.switchState("Play");

}