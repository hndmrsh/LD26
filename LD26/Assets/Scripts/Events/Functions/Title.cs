using UnityEngine;
using System.Collections;

public class Title : ScriptFunction {
	
	private ScriptEvents events;
	private string title;
	private int time;
	
	public Title(ScriptEvents events, string title, int time) {
		this.events = events;
		this.title = title;
		this.time = time;
	}

	public override void Execute() {
		print("title(" + title + "," + time + ")");
		events.TitleText = title;
		events.TitleTime = time;
	}
}
