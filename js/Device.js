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
 Main screen. use the convas function on HTML5. Do all the drawing task using this class.
*/ 
Screen = {
	// the create method, to genarate an object.
	createNew : function () {
		// the "this" object, use this to define members & methods.
		var screen = {};	
		
		// scale for drawing tasks.
		screen.getWidth = function () {
			return 480.0;
		}
		screen.getHeight = function () {
			return 853.0;
		}
		screen.getScale = function () {
			return 480.0 / 1080.0;
		}
		
		
		// Initializing function.
		var m_context = null;
		screen.init = function() {
			// get canvas context, use this to draw on canvas.
			if (m_context == null) {
				var canvas = document.getElementById("MainScreenCanvas");
				var canvasContext = canvas.getContext("2d");				
				m_context = canvasContext;
			}
		}
		
		// Draw an image on canvas object
		screen.drawImage = function (img, sx, sy, swidth, sheight, x, y, width, height) {
			m_context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
		}
		
		
		screen.drawBigImage = function (img, x, y, width, height) {
			m_context.drawImage(img, x, y, width, height);
		}
		
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return screen;     
	}
}

g_screen = Screen.createNew();

/**
 Input handler.
*/ 
Input = {
	// the create method, to genarate an object.
	createNew : function () {
		// the "this" object, use this to define members & methods.
		var input = {};
		
		// We can have more than 1 action per frame.
		var m_actions = {pressScreen: false};
		
		// push a action, we will handle this action when this frame is processed.
		input.addAction = function (action) {
			switch (action) {
			case "press_screen":
				m_actions.pressScreen = true;
				break;
			}
		}
		
		// find out whether this action is inputed?
		input.isAction = function (action) {
			switch (action) {
			case "press_screen":
				return m_actions.pressScreen;
				break;
				
			}
		}
		
		// flood all actions after a frame is processed.
		input.clear = function () {
			m_actions.pressScreen = false;
		}
		
		return input;
	}
}

g_input = Input.createNew();

// Copied from the Internet :)
function assert(bCondition, sErrorMsg) { 
　　 if (!bCondition) { 
　　 　　 alert(sErrorMsg); 
　　 　　 throw new Error(sErrorMsg); 
　　 } 
}

function mouseDown() {
	g_input.addAction("press_screen");
}

