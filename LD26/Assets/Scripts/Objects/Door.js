#pragma strict

public class Door extends Interactable{
	
	private var wardrobe : Wardrobe;
	
	function Start(){
		super.Start();
		wardrobe = GameObject.FindObjectOfType(Wardrobe);
	}
	
	function Look(){
		Q(say, ["Leads out to the apartment complex."]);
		Q(say, ["It's not the biggest place, but it is home."]);
	}
	
	function Use(){
		if(wardrobe.IsDressed()){
			MoveToDoor();
			
			Q(wait, [null, 200]);
			Q(say, ["Ready for work, I guess."]);
			Q(say, ["Dammit, I need a new job."]);
			
			Q(fadeOut, [null, 3000]);
			Q(wait, [null, 500]);
			
			MoveToHandle();
			Q(wait, [null, 2000]);
			Q(title, ["To be continued...", 1000000]);
		} else {
			Q(say, ["I don't think I'd keep my job very long if I showed up to work with no clothes on."]);
			Q(say, ["Especially not after last time..."]);
		}
	}
	
	// move to and back from lightswitch
	
	private var rotateY : float;
	
	function MoveToDoor(){
		rotateY = AngleToTargetY(player.gameObject.transform.eulerAngles.y, 180.0);
		Q(rotate, [Vector3(8.0,rotateY,0.0), 1400]);
		Q(move, [Vector3(1.1,0.0,-6.6), 1400]);
		Q(wait, [null, 2000]);
	}
	
	function MoveToHandle(){
		Q(rotate, [Vector3(11.0,14.0,1.0), 1400]);
		Q(move, [Vector3(-0.9,-1.8,-3.4), 1400]);
	}

}