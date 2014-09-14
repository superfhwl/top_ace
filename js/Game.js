/*
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


/**
 The main control loop and drawing control, game logic processing...
*/
Game = {
	createNew : function () {
		// the "this" object, use this to define members & methods.
		var game = {};
		
		/******************** resources ********************/
		// background is a simple image for now. so loading & drawing the BG is simple.
		var m_background = new Image();
		game.loadBackground = function (imagePath) {
			m_background.src = imagePath;
		}
		
		// actors is defined in data.js
		var m_actors = new Array();
		m_actors.push(data.loadActor("player"));
		m_actors.push(data.loadActor("net"));
		m_actors.push(data.loadActor("poop"));
		m_actors.push(data.loadActor("powerbar"));
		m_actors.push(data.loadActor("powercursor"));
		
		
		/******************** graphic process ********************/
		// class Game control the drawing task, so it owned a screen object.
		var m_screen = null;
		game.setScreen = function (screen) {
			m_screen = screen;
		}
		
		// do drawing tasks.
		game.drawBackground = function () {
			// There is some issue while drawing big image using this canvas API, use small pieces to draw.
			m_screen.drawImage(m_background, 0, 0, 200, 200, 0, 0, 200, 200);
			m_screen.drawImage(m_background, 200, 0, 200, 200, 200, 0, 200, 200);
			m_screen.drawImage(m_background, 400, 0, 80, 200, 400, 0, 80, 200);
			m_screen.drawImage(m_background, 0, 200, 200, 200, 0, 200, 200, 200);
			m_screen.drawImage(m_background, 200, 200, 200, 200, 200, 200, 200, 200);
			m_screen.drawImage(m_background, 400, 200, 80, 200, 400, 200, 80, 200);
			m_screen.drawImage(m_background, 0, 400, 200, 200, 0, 400, 200, 200);
			m_screen.drawImage(m_background, 200, 400, 200, 200, 200, 400, 200, 200);
			m_screen.drawImage(m_background, 400, 400, 80, 200, 400, 400, 80, 200);									
		}
		
		game.drawActors = function () {
			for (i in m_actors) {
				m_actors[i].draw(m_screen);
			}
		}
		
		/******************** game logic process ********************/
		
		
		/******************** input process ********************/
		
		
		/******************** frame contorl ********************/
		
		// main loop of game.
		game.loop = function () {
			// fps: 10
			setTimeout("game.loop()", 100);
			
			game.drawBackground();
			game.drawActors();
		}
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return game;    
	}
}

/**
 Define the main function.
*/
function main() {
	// Create a data object to use game resource.
	data = Data.createNew();
	
	// Create & init a screen object.
	screen = Screen.createNew();
	screen.init();
	
	// Create and init the game object.
	game = Game.createNew();						
	game.setScreen(screen);				     		// Turn on the main screen.
	game.loadBackground(data.getBackgroundPath());	// load the background resource.
	//game.loadActors(data.getAllActors());			// load all the actor's resource.
	
	// start the main loop
	game.loop();
}

/**
 Call the main function.
*/
main();
