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
		sprite.draw = function (screen, srcX, srcY, animation) {
			frameIndex = animation.getCurFrameId();
			frameWidth = animation.getFrameWidth();
			frameHeight = animation.getFrameHeight();
			
			srcRect = {x: frameIndex * frameWidth, 		y: 0, 							width: frameWidth, 							height: frameHeight};
			dstRect = {x: srcX * screen.getScale(), 	y: srcY * screen.getScale(), 	width: frameWidth * screen.getScale(), 		height: frameHeight * screen.getScale()};

			screen.drawImage(m_image, srcRect, dstRect);
		}
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return sprite;     
	}
}

/**
 The vectorgraphic is a graphic object like a image sprite, but drawed by calling systme API.
*/ 
VectorGraphic = {
	// the create method, to genarate an object.
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var vector = {};
		
		// "name" object is useful while debugging
		vector.name = name;

		
		// For vactor drawing animations, we use a drawFunction to handle drawing tasks.
		var m_drawFunction = null;
		
		vector.setDrawFunction = function (funcName) {
			switch (funcName) {
			case "powerbar":
				m_drawFunction = drawPowerBar;
				break;
				
			}
		}
		
		// do drawing task.
		vector.draw = function (screen, srcX, srcY, animation) {
			frameIndex = animation.getCurFrameId();
			frameWidth = animation.getFrameWidth();
			frameHeight = animation.getFrameHeight();

			
			drawRect = {x: srcX * screen.getScale(), y: srcY * screen.getScale(), width: frameWidth * screen.getScale(), height: frameHeight * screen.getScale()};
			m_drawFunction(screen, drawRect, frameIndex);
		}
		

		// call the init method
		vector.setDrawFunction(name);

		// return the "this" object, so we have all these members & methonds defined above now.
		return vector;   
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

		// For sprites witch based in image, we use a very simple animation solusion: increase the x axle in each frame.
		var m_offset = 0;
		var m_frames = null;
		
		animation.loadFrames = function (frames) {
			m_frames = frames;
		}
		
		animation.getCurFrameId = function () {
			return m_frames.frameIDArray[m_offset];
		}
		
		animation.getFrameWidth = function () {
			return m_frames.width;
		}
		
		animation.getFrameHeight = function () {
			return m_frames.height;
		}
		
		animation.getFrameCount = function () {
			return m_frames.frameIDArray.length;
		}
		
		// play / stop / replay the animation
		animation.play = function () {
			if (m_paused) {
				return;
			}
			
			if (m_offset < animation.getFrameCount() - 1) {
				m_offset++;		// Go ahead until we reach the last frame.
			}
			else if (m_loop) {
				m_offset = 0;		// If loop, goto the first frame, if not, just keep staying in the last frame.
			}
		}
		
		var m_paused = false;
		
		animation.pause = function () {
			m_paused = true;
		}
		
		animation.stop = function () {
			m_paused = true;
			m_offset = 0;
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


/**
 The draw function for powerbar object.
*/
function drawPowerBar(screen, drawRect, frameIndex) {
	var POWER_BAR_MAX_FRAME = 15;
	var yellow = '#ffff00';
	var red = '#ff0000';
	var darkRed = '#aa0000';
	var darkWhite = "#d3d3d3";
	
	screen.setAlpha(0.8);
	
	if (frameIndex <= POWER_BAR_MAX_FRAME) {
		level = drawRect.y + (((POWER_BAR_MAX_FRAME - frameIndex) / POWER_BAR_MAX_FRAME) * drawRect.height);
		clipRect = {x: drawRect.x, y: level, width: drawRect.width, height: (drawRect.y + drawRect.height) - level};
		screen.fillLinearGradientRectangle(clipRect, drawRect, yellow, red, "vertical_up");
	}	
	else if (frameIndex == 20){
		screen.fillRectangle(drawRect, darkRed);
	}
	else if (frameIndex == 21) {
		screen.fillRectangle(drawRect, red);		
	}
	
	screen.setAlpha(1.0);
	
	// draw the border.
	screen.drawRectangle(drawRect, darkWhite, 0.8);
}
