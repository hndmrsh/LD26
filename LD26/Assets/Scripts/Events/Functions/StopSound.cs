using UnityEngine;
using System.Collections;

public class StopSound : ScriptFunction {
	
	private AudioSource sound;
	
	public StopSound(AudioSource sound) {
		this.sound = sound;
	}
	
	public override void Execute() {
		print("stopSound(" + sound + ")");
		sound.Stop();
	}
	
}
