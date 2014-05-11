using UnityEngine;
using System.Collections;

public class Move : ScriptFunction {

	private Player player;
	private Vector3 positionAmt;
	private int time;

	public Move(Player player, Vector3 positionAmt, int time) {
		this.player = player;
		this.positionAmt = positionAmt;
		this.time = time;
	}

	public override void Execute() {
		print("move(" + positionAmt.x + "," + positionAmt.y + "," + positionAmt.z + ")");
		player.SetMove(positionAmt / time, time);
	}
}
