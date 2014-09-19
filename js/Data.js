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
 Game Data

*/ 
Data = {
	// the create method, to genarate an object.
	createNew : function () {
		// the "this" object, use this to define members & methods.
		var data = {};	
		
		// Define the background resource by hard coding.
		data.loadBackground = function () {
			background = new Image();
			background.src = "images/court.png";
			return background;
		}
		
		// Sprite's resorce form in an array, add a new row for new spirte.
		var spriteData = [
			{name: "player", 		imgPath: "images/player.png"	},
			{name: "net", 			imgPath: "images/net.png"		},
			{name: "poop", 			imgPath: "images/poop.png"		},
			{name: "powerbar", 		imgPath: "images/powerbar.png"	},
			{name: "powercursor", 	imgPath: "images/ball.png"		},
		];
		function loadSprite (spriteName) {
			for (i in spriteData) {
				if (spriteName == spriteData[i].name) {
					// create a new & empty object.
					sprite = Sprite.createNew(spriteName);
					
					// load sprite's data.
					sprite.loadImage(spriteData[i].imgPath);	
			
					return sprite;
				}
			}
		}
		
		// Animation's resource form in an array, add a new row for a new animation.
		var animationData = [
			{name: "player.stand",			frames: {width: 177, 	height:200, offset: [0]},				loop: false},
			{name: "player.hit",			frames: {width: 177, 	height:200, offset: [4, 5, 6, 7]},		loop: false},
			{name: "player.lanuch",			frames: {width: 177, 	height:200, offset: [0, 1, 2, 3]},		loop: false},
			{name: "net.normal",			frames: {width: 900 , 	height:101, offset: [0]},				loop: false},
			{name: "poop.normal",			frames: {width: 71, 	height:58, 	offset: [0]},				loop: false},
			{name: "powerbar.normal",		frames: {width: 39, 	height:800, offset: [0]},				loop: false},
			{name: "powercursor.normal",	frames: {width: 182, 	height:182, offset: [0]},				loop: false},
		];
		function loadAnimation (animationName) {
			for (i in animationData) {
				if (animationName == animationData[i].name) {
					// create a new & empty object.
					animation = Animation.createNew(animationName);
					
					// load animation's data.
					animation.loadFrames(animationData[i].frames);
					animation.setLoop(animationData[i].loop);					
			
					return animation;
				}
			}
		}

		
		// Actor's resource can't contain AI logic, it will be discribe in actor.js.
		// Edit this from to match screen size.
		var actorData = [
			{name: "player", 		pos: {x: 600, y: 1020},	visiable: true,		sprites: "player",		animations: ["player.stand", "player.hit", "player.lanuch"]	, AI: "playerFSM"},
			{name: "net", 			pos: {x: 120,  y: 700},	visiable: true,		sprites: "net",			animations: ["net.normal"]									, AI: null},
			{name: "poop", 			pos: {x: 260, y: 600},	visiable: true,		sprites: "poop",		animations: ["poop.normal"]									, AI: null},
			{name: "powerbar", 		pos: {x: 1000, y: 100},	visiable: true,		sprites: "powerbar",	animations: ["powerbar.normal"]								, AI: null},
			{name: "powercursor", 	pos: {x: 420, y: 300},	visiable: true,		sprites: "powercursor",	animations: ["powercursor.normal"]							, AI: null},
		];
		data.loadActor = function (actorName) {
			for (actIdx in actorData) {
				if (actorName == actorData[actIdx].name) {
					// create a new actor object.
					actor = Actor.createNew(actorName);    		
			
					// load sprite data, sprite name is givend in the from.
					sprite = loadSprite(actorData[actIdx].sprites);
					assert((sprite != null), "Load sprite " + actorData[actIdx].sprites + "error!");
					actor.addSprite(sprite);
					
					// load animations data
					for (aniIdx in actorData[actIdx].animations) {
						// load animation data, animations' names is listed in form actorData.
						animation = loadAnimation(actorData[actIdx].animations[aniIdx]);	
						assert((animation != null),  "Load animation " + actorData[actIdx].animations[aniIdx] + "error!");
						
						// add to actor.
						actor.addAnimation(animation);	
					}
					
					// load actor's data itself.
					actor.setPos(actorData[actIdx].pos.x, actorData[actIdx].pos.y);
					
					// Register actor's AI process functions.
					registerAI(actor, actorData[actIdx].AI);
					
					return actor;
				}
			}
			
			return actor;
		}

		
		// return the "this" object, so we have all these members & methonds defined above now.
		return data;     
	}
}
