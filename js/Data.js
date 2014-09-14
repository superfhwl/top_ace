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
		data.getBackgroundPath = function () {
			return "images/480_720/court.png";
		}
		
		
		// Sprite's resorce form in an array, edit this form to match the image size, or add a new row for new spirte.
		var sprites = new Array();

		var spriteData0 = {name: "player", 			imgPath: "images/480_720/player.png", 			frames: {count: 1, width: 55, height: 65}, 		pos: {x: 300, y: 300}};
		sprites.push(spriteData0);
		var spriteData1 = {name: "net", 			imgPath: "images/480_720/net.png", 				frames: {count: 1, width: 380, height: 43}, 	pos: {x: 60, y: 162}};
		sprites.push(spriteData1);
		var spriteData2 = {name: "poop", 			imgPath: "images/480_720/poop.png", 			frames: {count: 1, width: 30, height: 25}, 		pos: {x: 130, y: 122}};
		sprites.push(spriteData2);
		var spriteData3 = {name: "powerbar", 		imgPath: "images/480_720/powerbar.png", 		frames: {count: 1, width: 17, height: 280}, 	pos: {x: 430, y: 100}};
		sprites.push(spriteData3);
		var spriteData4 = {name: "powercursor", 	imgPath: "images/480_720/powercursor.png", 		frames: {count: 1, width: 30, height: 30}, 		pos: {x: 420, y: 300}};
		sprites.push(spriteData4);

		function loadSprite (spriteName) {
			for (i in sprites) {
				if (spriteName == sprites[i].name) {
					// create a new & empty object.
					sprite = Sprite.createNew();
							
					sprite.loadImage(sprites[i].imgPath);
					sprite.loadFrames(sprites[i].frames.count, sprites[i].frames.width, sprites[i].frames.height);
					sprite.setPos(sprites[i].pos.x, sprites[i].pos.y);
			
					return sprite;
				}
			}
		}

		// Actor's resource can't contain AI logic, it will be discribe in actor.js.
		data.loadActor = function (actorName) {
			// create a new actor object.
			actor = Actor.createNew();    		
			
			// load sprite data.
			actor.setSprite(loadSprite(actorName));
			actor.name = actorName;
			
			return actor;
		}

		
		// return the "this" object, so we have all these members & methonds defined above now.
		return data;     
	}
}


