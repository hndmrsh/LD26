using UnityEngine;
using System.Collections;

public class FadeOut : ScriptFunction {
	
	private ScriptEvents events;
	private int time;
	
	public FadeOut(ScriptEvents events, int time) {
		this.events = events;
		this.time = time;
	}
	
	public override void Execute() {
		print("fadeOut(" + time + ")");
		events.FadeAmount = 0.0f;
		events.FadeTime = time;
		events.FadeSpeed = 1.0f / events.FadeTime;
		events.FadingIn = false;
	}
}
