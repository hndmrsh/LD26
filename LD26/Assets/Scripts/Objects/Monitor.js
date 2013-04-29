#pragma strict

public class Monitor extends Interactable{
	
	function Look(){
		Q(say, ["Ancient. Do they even make these things any more?"]);
		Q(say, ["Wish I could afford an upgrade."]);
	}
	
	function Use(){
		Q(say, ["The computer's off, I don't need to turn the monitor on."]);
		Q(say, ["I don't have time for this anyway."]);
	}
	
}