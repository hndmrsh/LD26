using UnityEngine;
using System.Collections;

public class FadeIn : ScriptFunction {

	private ScriptEvents events;
	private int time;
	
	public FadeIn(ScriptEvents events, int time) {
		this.events = events;
		this.time = time;
	}
	
	public override void Execute() {
		print("fadeIn(" + time + ")");
		events.FadeAmount = 1.0f;
		events.FadeTime = time;
		events.FadeSpeed = 1.0f / events.FadeTime;
		events.FadingIn = true;
	}
}
