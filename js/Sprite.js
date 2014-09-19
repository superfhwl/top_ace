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
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var sprite = {};
		
		// "name" object is useful while debugging
		sprite.name = name;
		
		// a sprite use a single PNG image.
		var m_image = new Image();
		sprite.loadImage = function (imgPath) {
			m_image.src = imgPath;
		}
		
		// do drawing task.
		sprite.draw = function (screen, x, y, animation) {
			frameIndex = animation.getCurFrameId();
			frameWidth = animation.getFrameWidth();
			frameHeight = animation.getFrameHeight();
			
			var clipX = frameIndex * frameWidth;
			var clipY = 0;
			var drawX = x * screen.getScale();
			var drawY = y * screen.getScale();
			var drawWidth = frameWidth * screen.getScale();
			var drawHeight = frameHeight * screen.getScale();
			screen.drawImage(m_image, clipX, clipY, frameWidth, frameHeight, drawX, drawY, drawWidth, drawHeight);
		}
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return sprite;     
	}
}

/**
 The animation skull for an actor. 
 An actor can have many animations for different states.
*/ 
Animation = {
	// the create method, to genarate an object.
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var animation = {};
		
		// "name" object is useful while debugging
		animation.name = name;

		// We use a very simple animation solusion: increase the x axle in each frame.
		var m_curFrame = 0;
		var m_frames = 0;
		
		animation.loadFrames = function (frames) {
			m_frames = frames;
		}
		
		animation.getCurFrameId = function () {
			return m_frames.offset[m_curFrame];
		}
		
		animation.getFrameWidth = function () {
			return m_frames.width;
		}
		
		animation.getFrameHeight = function () {
			return m_frames.height;
		}
		
		animation.getFrameCount = function () {
			return m_frames.offset.length;
		}
		
		// play / stop / replay the animation
		animation.play = function () {
			if (m_paused) {
				return;
			}
			
			if (m_curFrame < animation.getFrameCount() - 1) {
				m_curFrame++;		// Go ahead until we reach the last frame.
			}
			else if (m_loop) {
				m_curFrame = 0;		// If loop, goto the first frame, if not, just keep staying in the last frame.
			}			
		}
		
		var m_paused = false;
		
		animation.pause = function () {
			m_paused = true;
		}
		
		animation.stop = function () {
			m_paused = true;
			m_curFrame = 0;
		}
		
		animation.start = function () {
			m_paused = false;
		}
		
		animation.restart = function () {
			animation.stop();
			animation.start();
		}

		var m_loop = false;
		
		animation.setLoop = function (loop) {
			m_loop = loop;
		}
		
		animation.getLoop = function () {
			return m_loop;
		}

		// return the "this" object, so we have all these members & methonds defined above now.
		return animation;   
	}
}
