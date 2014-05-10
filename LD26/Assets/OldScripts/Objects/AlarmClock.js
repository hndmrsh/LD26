#pragma strict

public class AlarmClock extends Interactable{

	function Use(){
		Q(say, ["It's off, and I'm already awake... although I wish I wasn't."]);
	}
	
	function Look(){
		Q(say, ["I hate that alarm clock. Nearly gives me a heart attack every damn morning."]);
		Q(say, ["I'd be out of a job if it didn't wake me up in time for work, though."]);
	}

}