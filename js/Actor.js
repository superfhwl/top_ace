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
					
					loginfo("Set animation: " + m_animations[i].name);
				}
			}
		}
		
		actor.pauseAnimation = function () {
			loginfo("Pause animation, actor: " + actor.name);
			
			m_animations[m_curAnimationId].pause();
		}
		
		actor.resumeAnimation = function () {
			loginfo("resume animation, actor: " + actor.name);
			
			m_animations[m_curAnimationId].start();
		}
		
		actor.getCurFrameId = function () {
			return m_animations[m_curAnimationId].getCurFrameId();
		}
		

		/********************* drawing ********************/
		
		// the coordinate of this Actor. handle the drawing tasks.
		// This is the left-up point of this actor.
		var m_pos = {x: 0, y: 0};

		actor.setPos = function (x, y) {
			m_pos.x = x;
			m_pos.y = y;
		}

		actor.getPos = function () {
			return m_pos;
		}

		// Default pos is defined in the data.js
		var m_defaultPos = {x: 0, y: 0};	

		actor.setDefaultPos = function (x, y) {
			m_defaultPos.x = x;
			m_defaultPos.y = y;
		}

		actor.getDefualtPos = function () {
			return m_defaultPos;
		}
		
		// return the center coordinator, it depends on the frame width
		actor.getCenterPos = function () {
			var point;
			
			point.x = m_pos.x + (m_animations[m_curAnimationId].getFrameWidth() / 2);
			point.y = m_pos.y + (m_animations[m_curAnimationId].getFrameHeight() / 2);
			
			return point;
		}
		
		
		// handle the drawing task.
		actor.draw = function (screen) {
			if (!actor.visiable()) {
				return;
			}
			
			animation = m_animations[m_curAnimationId];
			
			// if have image sprite, draw first
			if (m_sprite != null) {
				m_sprite.draw(screen, m_pos.x, m_pos.y, animation);				
			}
			
			// if have vector grapic , draw after sprite.
			if (m_vectorGraphic != null) {
				m_vectorGraphic.draw(screen, m_pos.x, m_pos.y, animation);				
			}
		}
		
		// if the actor is invisiable, don't draw on screen.
		var m_visiable;
		
		actor.visiable = function () {
			return m_visiable;
		}
		
		actor.setVisiable = function (visiableFlag) {
			m_visiable = visiableFlag;
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
				
			case "powerBarFSM":
				actor.fsm = PowerBarFSM.createNew(actor.name);
				break;

			case "ballFSM":
				actor.fsm = BallFSM.createNew(actor.name);
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
				if (EventQueue.findEvent("ball", "BALL_HIT_TARGET")) {
					actor.setAnimation("player.stand", false);
					m_state = STATE_STANDING;
				}
				break;
			}
		}
		
		return fsm;
	}
}

/**
 Power bar's AI
*/
PowerBarFSM = {
	// the create method, to genarate an object.
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var fsm = {};	
		
		// "name" object is useful while debugging
		fsm.name = name;

		// FSM states
		var STATE_NORMAL 		= 0;
		var STATE_LANUCHING 	= 1; 
		var STATE_HITTING  		= 2;
		var m_state = STATE_NORMAL;

		// max frame control the power animation
		var POWER_BAR_MAX_FRAME = 10;

		// AI entry method.
		fsm.play = function (actor, input) {
			switch (m_state) {
			case STATE_NORMAL:
				if (input.isAction("press_screen")) {
					actor.setAnimation("powerbar.launch", false);
					m_state = STATE_LANUCHING;
				}
				break;
				
			case STATE_LANUCHING:
				if (actor.getCurFrameId() == POWER_BAR_MAX_FRAME) {
					EventQueue.postEvent(actor, "POWER_BAR_REACH_TOP");
				}
				
				if (input.isAction("press_screen")) {
					if (actor.getCurFrameId() == POWER_BAR_MAX_FRAME) {
						actor.setAnimation("powerbar.max", true);
					}
					else {
						actor.pauseAnimation();
					}
					m_state = STATE_HITTING;
				}
				break;

			case STATE_HITTING:
				if (EventQueue.findEvent("ball", "BALL_HIT_TARGET")) {
					actor.setAnimation("powerbar.normal", false);
					m_state = STATE_NORMAL;
				}
				break;
			}
		}
		
		return fsm;
	}
}

/**
 The ball flying trace.
*/
BallFSM = {
	// the create method, to genarate an object.
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var fsm = {};	
		
		// "name" object is useful while debugging
		fsm.name = name;

		// FSM states
		var STATE_NORMAL 		= 0;
		var STATE_LANUCHING 	= 1; 
		var STATE_FLYING  		= 2;
		var m_state = STATE_NORMAL;		
		
		var m_ballLanuchPosOffset = 0;
		
		var m_ballStartPos;
		var m_ballEndPos;
		var m_ballFlyFrame = 0;
		
		// AI entry method.
		fsm.play = function (actor, input) {
			switch (m_state) {
			case STATE_NORMAL:
				if (input.isAction("press_screen")) {
					actor.setVisiable(true);
					m_ballLanuchPosOffset = -20;
					m_state = STATE_LANUCHING;
				}
				break;

			case STATE_LANUCHING:
				pos = actor.getPos();
				actor.setPos(pos.x, pos.y + m_ballLanuchPosOffset);
				m_ballLanuchPosOffset += 2;
				
				if (input.isAction("press_screen")) {
  					// set destnation of the ball flying track.
					m_ballEndPos = game.getActor("poop").getPos();
					m_ballStartPos = actor.getPos();
					m_ballFlyFrame = 0;

					m_state = STATE_FLYING;
				}
				break;
				
			case STATE_FLYING:
				m_ballFlyFrame++;
				var BALL_FLY_FRAME_COUNT = 10;
				if (m_ballFlyFrame > BALL_FLY_FRAME_COUNT ) {
					// post an event to other actors.
					EventQueue.postEvent(actor, "BALL_HIT_TARGET");

					// hide the ball
					actor.setVisiable(false);
					
					// set to default place
					pos = actor.getDefualtPos();
					actor.setPos(pos.x, pos.y);

					m_state = STATE_NORMAL;
				}
				else {
					x0 = (m_ballEndPos.x - m_ballStartPos.x) * 1.0;
					y0 = (m_ballEndPos.y - m_ballStartPos.y) * 1.0;
					dltX = ((m_ballFlyFrame * 1.0) / BALL_FLY_FRAME_COUNT * x0);
					dltY = ((m_ballFlyFrame * 1.0) / BALL_FLY_FRAME_COUNT * y0);

					actor.setPos(m_ballStartPos.x + dltX, m_ballStartPos.y + dltY);
				}
				break;
			}
		}

		return fsm;
	}
}

