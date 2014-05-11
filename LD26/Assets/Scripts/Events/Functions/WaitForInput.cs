using UnityEngine;
using System.Collections;

public class WaitForInput : ScriptFunction {

	private Player player;
	
	public WaitForInput(Player player) {
		this.player = player;
	}
	
	public override void Execute() {
		print("waitForInput()");
		player.WaitingForInput = true;
	}

}
