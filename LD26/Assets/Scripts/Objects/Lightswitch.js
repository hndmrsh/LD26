#pragma strict

public class Lightswitch extends Interactable{
	
	private var on : boolean = false;
	private var lights : HalogenLight[];
	private var lightswitch : GameObject;
	
	private var switchLimit : int = 2;
	private var joke : boolean = true;
	
	// queue-able function for switching state
	private var switchState = function(){
		if(on){
			on = false;
			for(var light : HalogenLight in lights){
				light.SwitchState();
			}
			lightswitch.transform.Rotate(30.0, 0.0, 0.0);
		} else {
			on = true;
			for(var light : HalogenLight in lights){
				light.SwitchState();
			}
			lightswitch.transform.Rotate(-30.0, 0.0, 0.0);
		}
	};
	
	function Start(){
		super.Start();
		lights = GameObject.FindSceneObjectsOfType(HalogenLight);
		lightswitch = GameObject.FindGameObjectWithTag("Top Lightswitch");
	}
	
	function Look(){
		if(on){
			Q(say, ["The lights are on, and on they shall stay."]);
		} else {
			Q(say, ["The lightswitch is over here. So is the fanswitch, but that can stay on."]);
			Q(say, ["It's damn hot."]);
		}
	}
	
	function Use(){
		if(on){
			if(!joke){
				Q(say, ["The lights can stay on. They're rather useful."]);
			} else {
			
				MoveTo();
				
				Q(switchState, []);

				switchLimit--;
				print("switchLimit="+switchLimit);
				
				if (switchLimit == 0){
					Q(wait, [null, 200]);
					Q(say, ["On. Off. On. Off."]);
					Q(say, ["No wonder the lights are always faulty!"]);
					joke = false;
					Q(wait, [null, 200]);
				}
				
				MoveBack();
			}
		} else {
		
			MoveTo();
		
			Q(switchState, []);
			if (switchLimit == 2){
				// first time turning on
				Q(wait, [null, 200]);
				Q(say, ["Aaah! My head is throbbing, and those damn lights aren't helping."]);
				Q(wait, [null, 1100]);
				Q(say, ["Nor does the nausea."]);
				Q(say, ["Shit."]);
				Q(say, ["It's going to be a long day."]);
				Q(wait, [null, 500]);
				Q(say, ["I should get dressed."]);
				Q(wait, [null, 200]);
			}
			
			MoveBack();
			
		}
		
	}
	
	// move to and back from lightswitch
	
	private var rotateY : float;
	
	function MoveTo(){
		rotateY = AngleToTargetY(player.gameObject.transform.eulerAngles.y, 200.0);
		Q(rotate, [Vector3(13.0,rotateY,0.0), 1400]);
		Q(move, [Vector3(-0.7,-1.4,-10.0), 1400]);
		Q(wait, [null, 2000]);
	}
	
	function MoveBack(){
		Q(move, [Vector3(0.7,1.4,10.0), 1400]);
		Q(rotate, [Vector3(-13.0,-rotateY,0.0), 1400]);
	}
	
	function IsOn() : boolean{
		return on;
	}
	
}