using UnityEngine;
using System.Collections;

public class Say : ScriptFunction {
	
	private Player player;
	private string toSay;
	
	public Say(Player player, string toSay) {
		this.player = player;
		this.toSay = toSay;
	}
	
	public override void Execute() {
		print("say(" + toSay + ")");
		player.Say = toSay;
		player.WaitingForInput = true;
	}
}

