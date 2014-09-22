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
 

*/ 
Actor = {
	// the create method, to genarate an object.
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var actor = {};	
		
		// "name" object is useful while debugging
		actor.name = name;
		
		/********************* recources ********************/
		
		// an actor owns 1 image sprite object.
		var m_sprite;
		actor.addSprite = function (sprite) {
			m_sprite = sprite;
		}
		
		// an actor owns 1 vector graphic object.
		var m_vectorGraphic;
		actor.addVectorGraphic = function (vector) {
			m_vectorGraphic = vector;
		}
		
		
		// an actor owns many animations.
		var m_animations = new Array();
		actor.addAnimation = function (animation) {
			m_animations.push(animation);
		}
		
		// actor's states control the animations.
		var m_curAnimationId = 0;
		actor.setAnimation = function (name, loopFlag) {
			for (i in m_animations) {
				if (name == m_animations[i].name) {
					m_curAnimationId = i;
					m_animations[i].setLoop(loopFlag);
					m_animations[i].restart();
				}
			}
		}

		/********************* drawing ********************/
		
		// the coordinate of this Actor. handle the drawing tasks.
		var m_x = 0;
		var m_y = 0;
		actor.setPos = function (x, y) {
			m_x = x;
			m_y = y;
		}
		
		// handle the drawing task.
		actor.draw = function (screen) {
			animation = m_animations[m_curAnimationId];
			m_sprite.draw(screen, m_x, m_y, animation);
		}
		
		/********************* AI logic ********************/
		// FSM class handled the AI logic for a specific actor. 
		// Define a FSM class in actor.js, and contact it's name to the actor's resource in data.js
		actor.fsm = null;
		
		// action & AI
		actor.action = function (input) {
			// process AI FSM
			if (actor.fsm != null) {
				actor.fsm.play(actor, input);
			}
			
			// play the animation
			m_animations[m_curAnimationId].play();
		}
		
		/**
		 Register AI process functions
		*/
		actor.registerAI = function (ProcFun) {
			switch (ProcFun) {
			case "playerFSM":
				actor.fsm = PlayerFSM.createNew(actor.name);
				break;
		
			}
		}
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return actor;     
	}
}

/**
 FSM class for the player.
*/
PlayerFSM = {
	// the create method, to genarate an object.
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var fsm = {};	
		
		// "name" object is useful while debugging
		fsm.name = name;

		// FSM states
		var STATE_STANDING 		= 0;
		var STATE_LANUCHING 	= 1; 
		var STATE_HITTING  		= 2;
		var m_state = STATE_STANDING;

		// AI entry method.
		fsm.play = function (actor, input) {
			switch (m_state) {
			case STATE_STANDING:
				if (input.isAction("press_screen")) {
					actor.setAnimation("player.lanuch", false);
					m_state = STATE_LANUCHING;
				}
				break;
				
			case STATE_LANUCHING:
				if (input.isAction("press_screen")) {
					actor.setAnimation("player.hit", false);
					m_state = STATE_HITTING;
				}
				break;

			case STATE_HITTING:
				if (input.isAction("press_screen")) {
					actor.setAnimation("player.stand", false);
					m_state = STATE_STANDING;
				}
				break;
			}
		}
		
		return fsm;
	}
}

