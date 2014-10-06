Dress Up Blueprint
======================================

Name: Dress Up Blueprint

Version: 1.0

Type: Blueprint

Author: Kiwi.js Team

Website: www.kiwijs.org

KiwiJS last version tested: 1.1.1

##Description:

The Dress Up Blueprint is a basic example of a Dress Up game you can use to rapidly build your project and has common dress up functionality.

If you have any problems then feel free to contact us via the http://www.kiwijs.org/help

##Features:

- Cycling buttons dynamically based on spritesheets and objects passed to the play state.
- Random and reset functions.
- Save and print character designs.


##How to use.

###Overview

The blueprint needs to be set up by doing the following:

STEP 1: 
--------------------------------------------
Preload any images used.
In the MainLoader.js file, preload any spritesheets used.

	Example: 
	MainLoader.preload = function () {
		this.addSpriteSheet('head', 'assets/head.png', 150, 117);
	};


STEP 2: 
--------------------------------------------
Include all sprites within the characterParts object passed to the playState. Also pass which cell of the animation you want to start with.

	Example:
	this.game.states.switchState("PlayState", playState, null, { characterParts: { head: 0 } });


###Creating a new dynamic dress up element 
To create a new dress up element with dynamically generated cycling buttons, you will need to use the name for your spritesheet. For example, let's say "arms". 

arms.png is the image we will be cycling through, and when switching to the play state, you will need to pass arms through the "obj" object.

	game.states.switchState("PlayState", playState, null, { obj: { arms: 0 } });

You can also manually add anything you like.
