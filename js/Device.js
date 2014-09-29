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
		
		// Set alpha
		screen.setAlpha = function (alphaValue) {
			m_context.globalAlpha = alphaValue;
		}
		
		// Draw an image on canvas object
		screen.drawImage = function (img, srcRect, dstRect) {
			m_context.drawImage(img, srcRect.x, srcRect.y, srcRect.width, srcRect.height, dstRect.x, dstRect.y, dstRect.width, dstRect.height);
		}
		
		
		screen.drawBigImage = function (img, dstRect) {
			m_context.drawImage(img, dstRect.x, dstRect.y, dstRect.width, dstRect.height);
		}
		
		screen.drawRectangle = function (dstRect, color, borderWidth) {
			// draw the border first.
		    m_context.lineWidth = borderWidth;
		    m_context.strokeStyle = color;
			m_context.strokeRect(dstRect.x, dstRect.y, dstRect.width, dstRect.height);
		}
		
		function createLinearGradient (rect, direction) {
			var linear;
			x = rect.x;
			y = rect.y;
			width = rect.width;
			height = rect.height;
			
			switch (direction) {
			case "vertical_up":
				linear = m_context.createLinearGradient(x, y + height, x, y);
				break;
			case "vertical_down":
				linear = m_context.createLinearGradient(x, y, x, y + height);
				break;
			case "horizontal_left":
				linear = m_context.createLinearGradient(x + width, y, x, y);
				break;
			case "horizontal_right":
				linear = m_context.createLinearGradient(x, y, x + width, y);
				break;
				
			}
			
			return linear;
		}
		
		screen.fillLinearGradientRectangle = function (clipRect, dstRect, color1, color2, direction) {
			linear = createLinearGradient(dstRect, direction);
			linear.addColorStop(0, color1);
			linear.addColorStop(1, color2);
			m_context.fillStyle = linear;
			
			fillX = max(clipRect.x, dstRect.x);
			fillY = max(clipRect.y, dstRect.y);
			fillWidth = min(clipRect.width, dstRect.width);
			fillHeight = min(clipRect.height, dstRect.height);
			m_context.fillRect(fillX, fillY, fillWidth, fillHeight);
		}
		
		screen.fillRectangle = function (dstRect, color) {
			m_context.fillStyle = color;
			m_context.fillRect(dstRect.x, dstRect.y, dstRect.width, dstRect.height);
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

function mouseDown() {
	g_input.addAction("press_screen");
}
