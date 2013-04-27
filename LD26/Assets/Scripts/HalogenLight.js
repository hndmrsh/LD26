#pragma strict

var intensity : double;
var flickerIntensity : double;
var flicker : boolean;
var on : boolean;


private var timeToNextFlick : int = 0;
private var flickTime : int = 0;

function Start(){
	if(on){
		light.intensity = intensity;
	} else {
		light.intensity = 0;
	}
}

function Update () {
	if(on && flicker){
		if(timeToNextFlick == 0){
			light.intensity = intensity;
			flickTime = Mathf.Pow(Random.Range(12, 30), 1.8);
		}
		
		if(timeToNextFlick >= flickTime){
			light.intensity = flickerIntensity;
			timeToNextFlick = -Mathf.Sqrt(Random.Range(25, 500));
		} else {
			timeToNextFlick++;
		}
	}
}

function SwitchState(){
	on = !on;
	if(!on){
		light.intensity = 0;
	} else {
		light.intensity = 0;
	}
}