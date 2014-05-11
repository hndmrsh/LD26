using UnityEngine;
using System.Collections;
using System;

public class ExecuteEvent : ScriptFunction {
	
	private ScriptEvents events;
	private Enum eventName;

	public ExecuteEvent(ScriptEvents events, Enum eventName) {
		this.events = events;
		this.eventName = eventName;
	}
	
	public override void Execute() {
		print("executeEvent(" + events + ", " + eventName + ")");
		events.ExecuteEvent(eventName);
	}
	
}
