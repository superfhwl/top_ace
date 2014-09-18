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
 Hash map class
*/
Map = {
	// the create method, to genarate an object.
	createNew : function (name) {
		// the "this" object, use this to define members & methods.
		var map = {};	
	
		// "name" object is useful while debugging
		map.name = name;
	
		// return the "this" object, so we have all these members & methonds defined above now.
		return map;    
	}
}