#pragma strict

public class Drawers extends Interactable {

	function Use(){
		Q(say, ["Those drawers are jammed shut. Nothing worthwhile in them anyway."]);
	}
	
	function Look(){
		Q(say, ["Full of junk. Last time I checked, I couldn't even get the drawers open."]);
		Q(say, ["They're made of cheap wood, which has probably expanded over the years. They've seen many changes of seasons."]);
	}

}