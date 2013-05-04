#pragma strict

public class Computer extends Interactable{

	private var apartmentEvents : ApartmentScriptEvents;
	
	function Start(){
		super.Start();
		apartmentEvents = GameObject.FindObjectOfType(ApartmentScriptEvents);
	}
	
	function Look(){
		Q(say, ["I've had this computer a while now. It's served me well, but it may be on its last legs."]);
	}
	
	function Use(){
		Q(say, ["Wonder if I have any emails? Maybe I have some new..."]);
		Q(wait, [null, 300]);
		Q(say, ["... clients."]);
		Q(say, ["It'll have to wait 'til I get home, at any rate."]);
		
		Q(executeEvent, [apartmentEvents, "police"]);
	}
	
}