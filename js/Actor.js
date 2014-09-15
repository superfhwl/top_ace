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
	createNew : function () {
		// the "this" object, use this to define members & methods.
		var actor = {};	
		
		// "name" object is useful while debugging
		var m_name = name;
		actor.getName() {return m_name;}
		
		// an actor owns 1 sprite object.
		var m_sprite;
		actor.setSprite = function (sprite) {
			m_sprite = sprite;
		}
		
		// handle the drawing task.
		actor.draw = function (screen) {
			m_sprite.draw(screen, m_x, m_y);
		}

		
		// the coordinate of this Actor. handle the drawing tasks.
		var m_x = 0;
		var m_y = 0;
		sprite.setPos = function (x, y) {
			m_x = x;
			m_y = y;
		}
		
		// return the "this" object, so we have all these members & methonds defined above now.
		return actor;     
	}
}


