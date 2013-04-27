#pragma strict

import System.Collections.Generic;

var autoCameraSpeed : double;

private var rotatingSpeed : Vector3;
private var rotatingTime : int;

private var movingSpeed : Vector3;
private var movingTime : int;

private var waitingTime : int;
private var waitingForInput : boolean;

private var toSay : String;

private var q : Queue.<Function>;

// FUNCTION VARIABLES

private var move = function(positionAmt : Vector3, time : int){
	print("move(" + positionAmt.x + "," + positionAmt.y + "," + positionAmt.z + ")");
	movingSpeed = positionAmt / time;
	movingTime = time;
};

private var rotate = function(rotationAmt : Vector3, time : int){
	print("rotate(" + rotationAmt.x + "," + rotationAmt.y + "," + rotationAmt.z + ")");
	rotatingSpeed = rotationAmt / time;
	rotatingTime = time;
};

private var say = function(s : String){
	print("say(" + s + ")");
	toSay = s;
	waitingForInput = true;
};

private var wait = function(dummy : Object, time : int){
	print("wait(" + time + ")");
	waitingTime = time;
};

private var waitForInput = function(){
	print("waitForInput()");
	waitingForInput = true;	
};

// wrapper function for queueing
function Q(func : Function, params : Object[]) : Function{
	q.Enqueue((function(){func.Call(params);}));
}

// END FUNCTION VARIABLES

function Start(){
	q = new Queue.<Function>();
	
	print("enqueueing");
	Q(say, ["Shit..."]);
	Q(say, ["Already?"]);
	Q(say, ["What time is it?"]);
	Q(move, [Vector3(1.8,0.0,0.0), 1200]);
	Q(rotate, [Vector3(35.0,-95.0,0.0), 1500]);
	Q(wait, [null, 1200]);
	Q(rotate, [Vector3(20.0,0.0,0.0), 600]);
	Q(wait, [null, 600]);
	Q(say, ["Ugh."]);
	Q(say, ["Fuck."]);
	Q(say, ["All right, I'm getting up."]);
	Q(rotate, [Vector3(-20.0,0.0,0.0), 600]);
	Q(wait, [null, 600]);
	Q(move, [Vector3(-1.8,0.0,0.0), 1400]);
	Q(rotate, [Vector3(-35.0,85.0,0.0), 2000]);
	Q(wait, [null, 2400]);
	Q(say, ["Ow."]);
	Q(say, ["My head..."]);
	Q(say, ["How much did I drink last night?"]);
	Q(say, ["Jesus."]);
	Q(move, [Vector3(-1.2,1.0,-4.0), 1800]);
	Q(rotate, [Vector3(52.0,73.0,0.0), 2000]);
	Q(wait, [null, 2100]);
	Q(say, ["Still dark out."]);
	Q(say, ["Suppose I'll need some light."]);
	Q(move, [Vector3(-2.7,1.2,0.0), 1800]);
	Q(wait, [null, 1300]);
	Q(rotate, [Vector3(0.0,-90.0,0.0), 1200]);
	Q(wait, [null, 900]);
	Q(move, [Vector3(0.0,0.0,-9.0), 2400]);
}

function Update () {
	CheckForInput();
	
	if(q.Count > 0){
		ExecuteNext();
	}
		
	if(waitingTime > 0){
		var wTime : int = Time.deltaTime * 1000.0;
		waitingTime -= wTime;
		if(waitingTime < 0){
			// we overshot, rollback slightly
			wTime += waitingTime;
			waitingTime = 0;
		}
		
	} 
	
	if(rotatingTime > 0){
		var rTime : int = Time.deltaTime * 1000.0;
		rotatingTime -= rTime;
		if(rotatingTime < 0){
			// we overshot, rollback slightly
			rTime += rotatingTime;
			rotatingTime = 0;
		}
		
		transform.eulerAngles += (rotatingSpeed * rTime);
	} 
	
	if(movingTime > 0){
		var mTime : int = Time.deltaTime * 1000.0;
		movingTime -= mTime;
		if(movingTime < 0){
			// we overshot, rollback slightly
			mTime += movingTime;
			movingTime = 0;
		}
		
		transform.localPosition += (movingSpeed * mTime);
	} 
		
	
	
}

function CheckForInput(){
	if(Input.anyKeyDown){
		toSay = null;
		waitingForInput = false;
	}
}

function ExecuteNext(){
	if(!waitingForInput && waitingTime <= 0){
		q.Dequeue().Call([]);
	}
}

function OnGUI(){
	if(toSay){
		var top : int = (Screen.height / 10) * 8;
		GUI.Box(Rect(0, top, Screen.width, Screen.height - top), toSay);
	}
}



