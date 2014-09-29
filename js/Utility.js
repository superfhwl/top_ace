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



function max(a, b) {
	if (a > b) {
		return a;
	}
	else {
		return b;
	}
}

function min(a, b) {
	if (a < b) {
		return a;
	}
	else {
		return b;
	}
}

var debugflag = true;

function loginfo(log) {
	if (debugflag == true) {
		console.info(log);
	}
}

function logtrace(log) {
	if (debugflag == true) {
		console.trace(log);
	}
}

/**
 An actor can post an event, and another actors would listen to this event.
*/
ActorEvent = {
	// the create method, to genarate an object.
	createNew : function (actor, msg) {
		// the "this" object, use this to define members & methods.
		var event = {};	
		

		var m_sourceActor = actor;
		event.getSrcActorName = function () {
			return m_sourceActor.name;
		}
		
		var m_msg = msg;
		event.getMsg = function () {
			return m_msg;
		}
		
		return event;
	}
}

/**
 An actor can post an event, and another actors would listen to this event.
*/
ActorEventQueue = {
	// the create method, to genarate an object.
	createNew : function () {
		// the "this" object, use this to define members & methods.
		var queue = {};	
		
		var m_eventQueue = [];
		var m_curEventIndex = 0;

		// post an event to queue.
		queue.postEvent = function (actor, msg) {
			var event = ActorEvent.createNew(actor, msg);
			m_eventQueue.push(event);
		}

		queue.clearAllEvent = function () {
			m_eventQueue.length = 0;
		}

		// read the event under the cur Index, and goto the next event.
		queue.readNextEvent = function () {
			if (m_curEventIndex < m_eventQueue.lenght) {
				event = m_eventQueue[m_curEventIndex];
				m_curEventIndex++;
			}

			return event;
		}
		
		// reset the cur Index.
		queue.gotoFirstEvent = function () {
			m_curEventIndex = 0;
		}
		
		// If there is a matched event?
		queue.findEvent = function (actorName, msg) {
			for (i in m_eventQueue) {
				if ((m_eventQueue[i].getMsg() == msg) && (m_eventQueue[i].getSrcActorName() == actorName)) {
					return true;
				}
			}
			
			return false;
		}
		
		return queue;
	}
}

EventQueue = ActorEventQueue.createNew();
