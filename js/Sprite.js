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
 The visual element on the screen.
*/ 
Sprite = {
	// the create method, to genarate an object.
	createNew : function () {
		// the "this" object, use this to define members & methods.
		var sprite = {};	
		
		// a sprite use a single PNG image.
		var m_image = new Image();
		sprite.loadImage = function (imgPath) {
			m_image.src = imgPath;
		}
		
		// We use a very simple animation solusion: increase the x axle in each frame.
		var m_curFrame = 0;
		var m_totalFrames = 0;
		var m_frameWidth = 0;
		var m_frameHeight = 0;
		sprite.loadFrames = function (totalFrames, frameWidth, frameHeight) {
			m_totalFrames = totalFrames;
			m_frameWidth = frameWidth;
			m_frameHeight = frameHeight;
		}
		
		// the coordinate of this sprite. handle the drawing tasks.
		var m_x = 0;
		var m_y = 0;
		sprite.setPos = function (x, y) {
			m_x = x;
			m_y = y;
		}
		
		// do drawing task.
		sprite.draw = function (screen) {
			screen.drawImage(m_image, (m_curFrame * m_frameWidth), 0, m_frameWidth, m_frameHeight, m_x, m_y, m_frameWidth, m_frameHeight);
			//screen.drawImage(m_image, m_x, m_y);
		}
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return sprite;     
	}
}


