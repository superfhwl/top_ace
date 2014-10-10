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
		var m_background = null;
		game.loadBackground = function (data) {
			m_background = data.loadBackground();
		}

		
		// actors is defined in data.js
		var m_actors = null;
		game.loadActors = function(data) {
			m_actors = new Array();
			m_actors.push(data.loadActor("player"));
			m_actors.push(data.loadActor("net"));
			m_actors.push(data.loadActor("poop"));
			m_actors.push(data.loadActor("powerbar"));	
			m_actors.push(data.loadActor("ball"));
		}

		game.getActor = function (name) {
			for (i in m_actors) {
				if (name == m_actors[i].name) {
					return m_actors[i];
				}
			}
		}
		
		/******************** graphic process ********************/
		// class Game control the drawing task, so it owned a screen object.
		var m_screen = null;
		game.setScreen = function (screen) {
			m_screen = screen;
		}
		
		// do drawing tasks.
		function drawBackground() {
			dstRect = {x: 0, y: 0, width: m_screen.getWidth(), height: m_screen.getHeight()};
			m_screen.drawBigImage(m_background, dstRect);
		}
		
		function drawActors() {
			for (i in m_actors) {
				m_actors[i].draw(m_screen);
			}
		}
		
		/******************** game logic process ********************/
		// the input object will handle the player's action.
		var m_input = null;
		game.setInput = function (input) {
			m_input = input;
		}
		
		function action(input) {
			for (i in m_actors) {
				m_actors[i].action(input);
			}
		}
		
		
		/******************** input process ********************/
		
		
		/******************** frame contorl ********************/
		
		// main loop of game.
		game.loop = function () {
			// fps: 10
			setTimeout("game.loop()", 100);
			
			// game logic & AI process.
			action(m_input);
			
			// drawing taskes.
			drawBackground();
			drawActors();
			
			// flood inputs
			m_input.clear();
			
			// flood events.
			EventQueue.updateAllEvent();
		}
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return game;    
	}
}

game = Game.createNew();

/**
 Define the main function.
*/
function main() {
	// Create a data object to use game resource.
	var data = Data.createNew();	
	
	// Turn on the main screen.
	g_screen.init();
	game.setScreen(g_screen);		
	
	// Listen the player's input.
	game.setInput(g_input);		
	
	// load game resources.
	game.loadBackground(data);		// load the background resource.
	game.loadActors(data);			// load all the actor's resource.
	
	// start the main loop
	game.loop();
}

/**
 Call the main function.
*/
main();

