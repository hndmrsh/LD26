#pragma strict

public class Lightswitch extends Interactable{
	
	private var on : boolean = false;
	private var lights : HalogenLight[];
	private var lightswitch : GameObject;
	
	private var switchLimit : int = 2;
	private var joke : boolean = true;
	
	function Start(){
		super.Start();
		lights = GameObject.FindSceneObjectsOfType(HalogenLight);
		lightswitch = GameObject.FindGameObjectWithTag("Lightswitch");
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
			
				MoveToSwitch();
				
				on = false;
				for(var light : HalogenLight in lights){
					light.SwitchState();
				}
				lightswitch.transform.Rotate(Vector3(-30.0,0,0));

				switchLimit--;
				print("switchLimit="+switchLimit);
				
				if (switchLimit == 0){
					Q(say, ["On. Off. On. Off."]);
					Q(say, ["No wonder the lights are always faulty!"]);
					joke = false;
				}
				
				MoveBack();
			}
		} else {
			on = true;
			for(var light : HalogenLight in lights){
				light.SwitchState();
			}
			lightswitch.transform.Rotate(Vector3(30.0,0,0));
	
			MoveToSwitch();
			
			if (switchLimit == 2){
				// first time turning on
				Q(say, ["Aaah! My head is throbbing, and those damn lights aren't helping."]);
				Q(wait, [null, 1100]);
				Q(say, ["And now my stomach feels like it's being slowly dissolved from within."]);
				Q(say, ["It's going to be a long day."]);
				Q(wait, [null, 500]);
				Q(say, ["Better get dressed, I suppose."]);
			}
			
			MoveBack();
			
		}
		
	}
	
	function MoveToSwitch(){
	
	}
	
	function MoveBack(){
	
	}
	
}