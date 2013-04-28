#pragma strict

public class Lights extends Interactable{
	
	private var on : boolean = false;
	private var flickering : boolean = false;
	
	function GetStatus(){
		for(var l : HalogenLight in GetComponentsInChildren(HalogenLight)){
			if(l.on){
				on = true;
			}
			
			if(l.flicker){
				flickering = true;
			}
		}
	}
	function Look(){
		GetStatus();
		
		if(!on){
			Q(say, ["Lights. They give off a nasty glow, but they work..."]);
			Q(say, ["... mostly."]);
		} else if(flickering){
			Q(say, ["Ugh. I need to replace that light. Again."]);
		} else {
			Q(say, ["FUCK that's bright."]);
			Q(say, ["Pro tip: when hungover, do not look directly at the light."]);
		}
	}
	
	function Use(){
		GetStatus();
		
		if(!on){
			Q(say, ["Yeah, replacing the lights might help. Turning them on would probably help more, though."]);
		} else if(flickering){
			Q(say, ["I would replace the lights, but I need the lights on to do it. Ironic, right?"]);
		} else {
			Q(say, ["Shit, they're actually working properly. No need to change them now!"]);
			Q(say, ["Incredible."]);
		}
	}
	
}