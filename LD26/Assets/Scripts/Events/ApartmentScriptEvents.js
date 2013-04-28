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
		print("enqueueing");
		Q(fadeOut, [null, 1]);
		Q(wait, [null, 1500]);
		// play alarm sound now until after the "all right I'm getting up" text has been dismissed
		//(can do this on time, as time will not decrease while waiting for input)
		Q(wait, [null, 2000]);
		Q(title, ["Ludum Dare\n26", 4000]);
		Q(wait, [null, 5000]);
		Q(fadeIn, [null, 2000]);
		Q(wait, [null, 2500]);
		Q(say, ["Shit..."]);
		Q(say, ["Already?"]);
		Q(say, ["What time is it?"]);
		Q(move, [Vector3(1.8,0.0,0.0), 1200]);
		Q(rotate, [Vector3(35.0,-95.0,0.0), 1200]);
		Q(wait, [null, 1200]);
		Q(rotate, [Vector3(10.0,0.0,0.0), 600]);
		Q(wait, [null, 1200]);
		Q(say, ["Ugh."]);
		Q(say, ["Fuck."]);
		Q(say, ["All right, I'm getting up."]);
		Q(rotate, [Vector3(-20.0,0.0,0.0), 900]);
		Q(wait, [null, 900]);
		Q(move, [Vector3(-1.8,0.0,0.0), 1500]);
		Q(rotate, [Vector3(-35.0,85.0,0.0), 1800]);
		Q(wait, [null, 1800]);
		Q(say, ["..."]);
		Q(say, ["Owwww!"]);
		Q(say, ["My head..."]);
		Q(say, ["How much did I drink last night, anyway?"]);
		Q(say, ["Jesus."]);
		Q(move, [Vector3(-1.2,1.0,-4.0), 1800]);
		Q(rotate, [Vector3(52.0,73.0,0.0), 2000]);
		Q(wait, [null, 2100]);
		Q(say, ["Still dark out."]);
		Q(say, ["Suppose I'll need some light."]);
		Q(move, [Vector3(-2.7,1.2,0.0), 1800]);
		Q(wait, [null, 1300]);
		Q(rotate, [Vector3(0.0,-90.0,0.0), 1200]);
		Q(wait, [null, 900]);
		Q(move, [Vector3(0.0,0.0,-9.0), 2400]);
	}
	
}
