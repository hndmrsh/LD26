#pragma strict

var height : int;
var expandSpeed : int;

private var position : int;

private var player : Player;

function Start() {
	position = -height + 1;
	player = gameObject.GetComponent(Player);
}

function OnGUI() {
	UpdatePosition();	
	DrawInventory();
}

function UpdatePosition() {
	if(player.IsAcceptingInput() && (Screen.height - Input.mousePosition.y) <= (position + height) && position < 0){
		print("expanding");
		position += expandSpeed;
		ConstrictPosition();
	} else if((!player.IsAcceptingInput() || (Screen.height - Input.mousePosition.y) > (position + height)) && position > (-height + 1)){
		print("retracting");
		position -= expandSpeed;
		ConstrictPosition();
	}
}

function ConstrictPosition() {
	if(position > 0){
		position = 0;		
	} else if(position < (-height + 1)){
		position = -height + 1;
	}
}

function DrawInventory() {
	GUI.Box(Rect(0, position, Screen.width, height), "");
}