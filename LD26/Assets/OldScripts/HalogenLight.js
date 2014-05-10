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
		if(flickTime == 0){
			light.intensity = intensity;
			// time to next flick
			timeToNextFlick = Mathf.Pow(Random.Range(12, 20), 1.8);
		}
		
		if(flickTime >= timeToNextFlick){
			light.intensity = flickerIntensity;
			flickTime = -Mathf.Sqrt(Random.Range(25, 1000));
		} else {
			flickTime++;
		}
	}
}

function SwitchState(){
	on = !on;
	if(!on){
		light.intensity = 0;
	} else {
		light.intensity = intensity;
	}
}