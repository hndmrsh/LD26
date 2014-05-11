using UnityEngine;
using System.Collections;

public class PlaySound : ScriptFunction {

	private AudioSource sound;

	public PlaySound(AudioSource sound) {
		this.sound = sound;
	}

	public override void Execute() {
		print("startSound(" + sound + ")");
		sound.Play();
	}

}
