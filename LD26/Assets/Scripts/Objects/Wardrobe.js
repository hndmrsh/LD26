#pragma strict

public class Wardrobe extends Interactable{
	
	function Look(){
		Q(say, ["Full of clothes."]);
		Q(say, ["Well, as full as can be with my income..."]);
		
	}
	
	function Use(){
		Q(say, ["I like to see what I'm doing while I get dressed..."]);
	}
	
}