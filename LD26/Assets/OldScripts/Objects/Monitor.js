#pragma strict

public class Monitor extends Interactable{
	
	private var terminal : Terminal;
	private var wardrobe : Wardrobe;
	
	// queue-able function for turning terminal on/off
	private var switchState = function(t : Terminal){
		print("switchState()");
		t.SwitchState();
	};
	
	function Start(){
		super.Start();
		terminal = GameObject.FindObjectOfType(Terminal);
		wardrobe = GameObject.FindObjectOfType(Wardrobe);
	}
	
	function Look(){
		if(terminal.IsOn()){
			Q(say, ["Looks like there's an operating system on this drive."]);
			Q(say, ["But what the hell am I supposed to do with it?"]);
		} else {
			Q(say, ["Ancient. Do they even make these things any more?"]);
			Q(say, ["Wish I could afford an upgrade."]);
		}
	}
	
	function Use(){
		if(wardrobe.IsDressed()){ // later, we will check here if USB stick is in computer or not
			if(player.IsUsingTerminal()){
				MoveBack();
			} else {
				MoveTo();
			}
		} else {
			Q(say, ["The computer's off, I don't need to turn the monitor on."]);
			Q(say, ["I don't have time for this anyway."]);
		}
	}
	
	private var rotateY : double;
	function MoveTo(){
		rotateY = AngleToTargetY(player.gameObject.transform.eulerAngles.y, 269.2);
		Q(rotate, [Vector3(-7.0,rotateY,0), 1400]);
		Q(move, [Vector3(-5.9,-1.87,1.02), 1400]);
		Q(wait, [null, 2000]);
		
		Q(switchState, [terminal]);
	}
	
	function MoveBack(){
		Q(switchState, [terminal]);
		Q(wait, [null, 600]);
		
		Q(move, [Vector3(5.9,1.87,-1.02), 1400]);
		Q(rotate, [Vector3(7.0,-rotateY,0), 1400]);

		
	}
	
}