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
		
		// Image sprite's resorce form in an array, add a new row for new spirte.
		var spriteData = [
			{name: "player", 		imgPath: "images/player.png"	},
			{name: "net", 			imgPath: "images/net.png"		},
			{name: "poop", 			imgPath: "images/poop.png"		},
			{name: "ball",			imgPath: "images/ball.png"		},
		];
		function loadSprite (spriteName) {
			for (i in spriteData) {
				if (spriteName == spriteData[i].name) {
					// create a new & empty object.
					var sprite = null;
					sprite = Sprite.createNew(spriteName);
					
					// load sprite's data.
					sprite.loadImage(spriteData[i].imgPath);	
					
					loginfo("	Load sprite success: " + sprite.name);
					
					return sprite;
				}
			}
		}
		
		// Animation's resource form in an array, add a new row for a new animation.
		var animationData = [
			{name: "player.stand",			loop: false,	frameData: {width: 177, 	height:200, frameIDArray: [0]},},
			{name: "player.hit",			loop: false,	frameData: {width: 177, 	height:200, frameIDArray: [4, 5, 6, 7]},},
			{name: "player.lanuch",			loop: false,	frameData: {width: 177, 	height:200, frameIDArray: [0, 1, 2, 3]},},
			{name: "net.normal",			loop: false,	frameData: {width: 900 , 	height:101, frameIDArray: [0]},},
			{name: "poop.normal",			loop: false,	frameData: {width: 71, 		height:58, 	frameIDArray: [0]},},
			{name: "powerbar.normal",		loop: false,	frameData: {width: 40, 		height:700, frameIDArray: [0]},},
			{name: "powerbar.launch",		loop: false,	frameData: {width: 40, 		height:700, frameIDArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]},	},
			{name: "powerbar.max",			loop: true,		frameData: {width: 40, 		height:700, frameIDArray: [20, 21]},},
			{name: "ball.normal",			loop: false,	frameData: {width: 20, 		height:20, 	frameIDArray: [0]},}
		];
		function loadAnimation (animationName) {
			for (i in animationData) {
				if (animationName == animationData[i].name) {
					// create a new & empty object.
					var animation = null;
					animation = Animation.createNew(animationName);
					
					// load animation's data.
					animation.loadFrames(animationData[i].frameData);
					animation.setLoop(animationData[i].loop);						
					
					loginfo("	Load anmation auccess: " + animation.name);
					
					return animation;
				}
			}
		}
		
		// AI logic will be discribe in actor.js.
		// Edit this from to match screen size.
		var actorData = [
			{name: "player", 		pos: {x: 600, y: 1020},	visiable: true,		graphicType: "image",	sprites: "player",				animations: ["player.stand", "player.hit", "player.lanuch"]				, AI: "playerFSM"},
			{name: "net", 			pos: {x: 120,  y: 700},	visiable: true,		graphicType: "image",	sprites: "net",					animations: ["net.normal"]												, AI: null},
			{name: "poop", 			pos: {x: 260, y: 600},	visiable: true,		graphicType: "image",	sprites: "poop",				animations: ["poop.normal"]												, AI: null},
			{name: "powerbar", 		pos: {x: 990, y: 500},	visiable: true,		graphicType: "vector",	vectorGraphic: "powerbar",		animations: ["powerbar.normal", "powerbar.launch", "powerbar.max"]	 	, AI: "powerBarFSM"},
			{name: "ball", 			pos: {x: 630, y: 1000},	visiable: false,	graphicType: "image",	sprites: "ball",				animations: ["ball.normal"]	 											, AI: null},
		];
		data.loadActor = function (actorName) {
			for (actIdx in actorData) {
				if (actorName == actorData[actIdx].name) {
					// create a new actor object.
					var actor = null;
					actor = Actor.createNew(actorName);    	
					
					loginfo("Load actor: " + actor.name);	
			
					// load sprite data, sprite name is given in the from.
					if (actorData[actIdx].graphicType == "image") {
						spriteName = actorData[actIdx].sprites;

						sprite = loadSprite(spriteName);
						console.assert(sprite != null);			
					
						actor.addSprite(sprite);
					}
					else if (actorData[actIdx].graphicType == "vector") {
						vgName = actorData[actIdx].vectorGraphic;
						
						vectorGraphic = VectorGraphic.createNew(vgName);
						console.assert(vectorGraphic != null);	
						
						actor.addVectorGraphic(vectorGraphic);
					}
					
					// load animations data
					for (aniIdx in actorData[actIdx].animations) {
						// load animation data, animations' names is listed in form actorData.
						animation = loadAnimation(actorData[actIdx].animations[aniIdx]);
						if (animation != null) {
							// add to actor.
							actor.addAnimation(animation);								
						}
					}
					
					// load actor's data itself.
					actor.setPos(actorData[actIdx].pos.x, actorData[actIdx].pos.y);
					actor.setVisiable(actorData[actIdx].visiable);
					
					// Register actor's AI process functions.
					actor.registerAI(actorData[actIdx].AI);
					
					loginfo("Load actor success: " + actor.name);
					
					return actor;
				}
			}
		}

		
		// return the "this" object, so we have all these members & methonds defined above now.
		return data;     
	}
}
