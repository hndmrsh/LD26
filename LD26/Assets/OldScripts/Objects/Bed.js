#pragma strict

public class Bed extends Interactable{

	function Use(){
		Q(say, ["I wish. Need to get to work, though. I can't risk being late again."]);
		Q(wait, [null, 800]);
		Q(say, ["I hate my job, but I certainly can't afford to lose it."]);
	}
	
	function Look(){
		Q(say, ["It's small, but I'll be damned if it isn't comfortable."]);
		Q(say, ["Winter's coming, though. I'll need to buy a duvet."]);
	}

}