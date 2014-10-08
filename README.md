Dress Up Blueprint 1.0.0
======================================

The Dress up Blueprint is a basic example of a Dress up game. This Blueprint has been created as an example of how you can create this type of game in Kiwi but you can also use this Blueprint to help rapidly create one for yourself. 

This Blueprint has been extended from and made into a slightly more complex game named the ('Zoe Dressup Game')[https://github.com/gamelab/Zoe-Dress-up-Blueprint].


Created by the Kiwi.JS team, this blueprint is designed to show and help out users who are new Kiwi.JS and/or game development and would like to see some game-code in action.   


##Versions

KiwiJS last version test: 1.1.1


##Features:

This blueprint includes:
* Cycling buttons dynamically based on spritesheets and objects passed to the play state.
* Random and reset functions.
* Save and print character designs.


##Folders / Files of Note

* /src - All of the working source files for the game. These are compiled into a single file and included into the HTML file.
* /build - Where the latest built version of the game will be stored. Both minified and un-minified.
* /assets - Any game assets are stored
* /lib - External libraries / plugins that are relied upon for the game to work. This includes kiwi.js. 
* index.html - HTML file upon which the game is displayed.


##Compling the Game
This project uses grunt to compile all of the source code (which can be located in the 'src' folder) into a single javascript file which is then included in the main HTML file. 

The steps below assume you already have a copy of the repo.


###Using Grunt

To be able to use grunt, you will firstly need to install (node.js)[http://nodejs.org/] and then the (grunt CLI package)[http://gruntjs.com/getting-started].

With that done, navigate to the 'root' directory of this repo on your computer and using the node package manager install the package dependencies. 

	npm install

To build the game and create a minified version use the default command.

	grunt

To start a local server so you can view the game. Use the 'serve' command.
	
	grunt serve 


##How to use 

The core game code for this Blueprint can be found in the 'play.js' file, which holds the 'Play' State for the game.


##Contribute
If you discover a bug or find yourself just wanting to jump on in and help make this blueprint even better please file and issue and get stuck in. We're a friendly bunch and hope people find themselves wanting to get involved.

https://github.com/gamelab/Dressup-Blueprint/issues/new


