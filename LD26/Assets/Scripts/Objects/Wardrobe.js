#pragma strict

public class Wardrobe extends Interactable{
	
	private var lightswitch : Lightswitch;
	private var dressed : boolean;
	
	function Start(){
		super.Start();
		lightswitch = GameObject.FindObjectOfType(Lightswitch);
		dressed = false;
	}
	
	function Look(){
		Q(say, ["Full of clothes."]);
		Q(say, ["Well, as full as can be with my income."]);
		Q(say, ["The bit on the side helps, mind."]);
		
	}
	
	function Use(){
		if(lightswitch.IsOn() && !dressed){
			MoveTo();
			
			Q(wait, [null, 200]);
			Q(say, ["Better hurry and get dressed, I need to be at work soon."]);
			Q(fadeOut, [null, 800]);
			// play sound here.
			Q(wait, [null, 4000]);
			dressed = true;
			Q(fadeIn, [null, 800]);
			Q(wait, [null, 800]);
			Q(say, ["This'll do."]);
			Q(wait, [null, 500]);
			Q(say, ["If I leave for work now, I may actually get there on time."]);
			Q(say, ["That'll make a nice change."]);
			Q(wait, [null, 200]);
			
			MoveBack();
		} else if(dressed){
			Q(say, ["I have enough clothes on for now."]);
			Q(say, ["In this weather, I'm wearing as little as I can get away with."]);
		} else {
			Q(say, ["I like to see what I'm doing while I get dressed..."]);
		}
	}
	
	function IsDressed() : boolean {
		return dressed;
	}
	
	var rotateY : float;
	function MoveTo(){
		rotateY = AngleToTargetY(player.gameObject.transform.eulerAngles.y, 352.0);
		Q(rotate, [Vector3(3.0,rotateY,0.0), 1400]);
		Q(move, [Vector3(-5.3,0.0,7.5), 1400]);
		Q(wait, [null, 1400]);
	}
	
	function MoveBack(){
		Q(move, [Vector3(5.3,0.0,-7.5), 1400]);
		Q(rotate, [Vector3(-3.0,-rotateY,0.0), 1400]);
	}
	
}