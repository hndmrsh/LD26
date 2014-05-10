#pragma strict

public class Blinds extends Interactable{
	
	function Look(){
		Q(say, ["The city sleeps, and I get up for work."]);
		Q(say, ["Jesus, I hate Mondays."]);
		Q(wait, [null, 400]);
		Q(say, ["I hate hangovers more."]);
	}
	
	function Use(){
		Q(say, ["Nothing to see at this time of the morning."]);
		Q(say, ["I like my privacy anyway."]);
	}

}