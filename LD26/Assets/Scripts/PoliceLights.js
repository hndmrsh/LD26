#pragma strict

var intensity : double;
var on : boolean;

var rotateSpeed : double;

private var lights : Component[];

private var fadeTime : int;
private var fadeSpeed : double;
private var currentIntensity : double;


function Start(){
	lights = gameObject.GetComponentsInChildren(Light);
	
	for(var l : Light in lights){
		if(on){
			l.light.intensity = intensity;
		} else {
			l.light.intensity = 0;
		}
	}
}

function Update () {

	if(fadeTime > 0){
		var fTime : int = Time.deltaTime * 1000.0;
		fadeTime -= fTime;
		if(fadeTime < 0){
			// we overshot, rollback slightly
			fTime += fadeTime;
			fadeTime = 0;
		}
		
		if(on){
			currentIntensity += (fadeSpeed * fTime);
		} else {
			currentIntensity -= (fadeSpeed * fTime);
		}

		// check if this is the last frame of fading; if so, set to target
		if(fadeTime == 0 && on){
			currentIntensity = intensity;
		} else if(fadeTime == 0){
			currentIntensity = 0.0;
		}
		
		for(var l : Light in lights){
			l.light.intensity = currentIntensity;
		}
	}
	
	if(on){
		for(var l : Light in lights){
			l.transform.eulerAngles.y += rotateSpeed * (Time.deltaTime * 1000.0);
		}
	}
		
}

function SwitchState(timeToFade : int){
	on = !on;
	fadeTime = timeToFade;
	fadeSpeed = intensity / timeToFade;
}