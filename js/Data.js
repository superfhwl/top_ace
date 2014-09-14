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
		
		/******************** player ********************/
		data.loadPlayer = function () {
			sprite = Sprite.createNew();		// create a new & empty object.
			sprite.loadImage("images/480_720/player.png")
			sprite.loadFrames(1, 50, 59);
			
			actor = Actor.createNew();    		// create a new actor object.
			actor.setSprite(sprite);
			
			return actor;
		}
		
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return data;     
	}
}



