using UnityEngine;
using System.Collections;

public class Wait : ScriptFunction {

	private Player player;
	private int time;

	public Wait(Player player, int time) {
		this.player = player;
		this.time = time;
	}
	
	public override void Execute() {
		print("wait(" + time + ")");
		player.WaitingTime = time;
	}
}
