using UnityEngine;
using System.Collections;

public class Rotate : ScriptFunction {
	
	private Player player;
	private Vector3 rotationAmt;
	private int time;
	
	public Rotate(Player player, Vector3 rotationAmt, int time) {
		this.player = player;
		this.rotationAmt = rotationAmt;
		this.time = time;
	}
	
	public override void Execute() {
		print("move(" + rotationAmt.x + "," + rotationAmt.y + "," + rotationAmt.z + ")");
		player.SetRotate(rotationAmt / time, time);
	}
}
