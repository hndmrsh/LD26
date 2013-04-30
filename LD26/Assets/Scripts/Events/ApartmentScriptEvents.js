#pragma strict

import System.Collections.Generic;

public class ApartmentScriptEvents extends ScriptEvents {

	function ExecuteEvent(event : String) : boolean {
		switch(event){
			case "wake_up":
				WakeUp();
				return true;
		}
		
		return super.ExecuteEvent(event);
	}
	
	// the first event; waking up in your apartment
	function WakeUp(){
		var alarm : AudioSource = GameObject.FindObjectOfType(AlarmClock).audio;
		
		Q(fadeOut, [null, 1]);
		Q(wait, [null, 1500]);
		Q(playSound, [alarm]);
		Q(wait, [null, 2000]);
		Q(title, ["Morning", 4000]);
		Q(wait, [null, 5000]);
		Q(fadeIn, [null, 2000]);
		Q(wait, [null, 2500]);
		Q(say, ["Shit..."]);
		Q(say, ["Already?"]);
		Q(say, ["What time is it?"]);
		Q(move, [Vector3(2.0,0.0,0.0), 600]);
		Q(rotate, [Vector3(55.0,-95.0,0.0), 1500]);
		Q(wait, [null, 1800]);
		Q(say, ["Ugh."]);
		Q(say, ["Fuck."]);
		Q(say, ["All right, I'm getting up."]);
		Q(stopSound, [alarm]);
		Q(rotate, [Vector3(-55.0,95.0,0.0), 1500]);
		Q(wait, [null, 900]);
		Q(move, [Vector3(-2.0,0.0,0.0), 600]);
		Q(wait, [null, 1200]);
		Q(say, ["..."]);
		Q(say, ["Owwww!"]);
		Q(say, ["My head..."]);
		Q(say, ["How much did I drink last night, anyway?"]);
		Q(say, ["Jesus."]);
		Q(move, [Vector3(-1.2,1.0,-4.0), 1800]);
		Q(rotate, [Vector3(52.0,73.0,0.0), 2000]);
		Q(wait, [null, 2100]);
		Q(say, ["Still dark out."]);
		Q(say, ["Better hit the lights."]);
		Q(move, [Vector3(-2.7,1.2,0.0), 1800]);
		Q(wait, [null, 1300]);
		Q(rotate, [Vector3(0.0,-80.0,0.0), 1200]);
		Q(wait, [null, 900]);
		Q(move, [Vector3(0.0,0.0,-9.0), 2400]);
		
		
	}
	
}
