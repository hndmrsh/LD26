#pragma strict

import System.Collections.Generic;

public class Player extends MonoBehaviour {
	
	var scriptEvents : ScriptEvents;
	var cursors : Texture2D[];
	
	var guiStyle : GUIStyle;
	var hit : RaycastHit;
	
	private var rotatingSpeed : Vector3;
	private var rotatingTime : int;
	
	private var movingSpeed : Vector3;
	private var movingTime : int;
	
	private var waitingTime : int;
	private var waitingForInput : boolean;
	
	private var say : String;
	private var sayCount : int;
	
	private var acceptingInput : boolean;
	
	private var currentCursor : int = 0;
	private var cursorSize : int = 32;
	
	// constants
	private var sayTick : int = 70; // number of ms to wait between printing characters
	private var mouseRotationSpeed : double = 1.0;
	// end constants
	
	function Start(){
		Screen.showCursor = false;
		scriptEvents.ExecuteEvent("wake_up");
	}
	
	function Update () {
		CheckForInput();
		
		// run scripted actions
		Move();
		Rotate();
		Wait();
		
		// check if mouse is on edge of screen; if so, rotate
		RotateByMouse();
	}
	
	function CheckForInput(){
		if(Input.GetButtonDown("Quit")){
			print("quit");
			Application.Quit();
		} 
		
		if(Input.GetButtonDown("Advance Text") && say){
			if(sayCount < (sayTick * say.Length)){
				sayCount = (sayTick * say.Length);
			} else {
				// clear the current text
				say = null;
				sayCount = 0;
				waitingForInput = false;
			}
		} 
		
		if(acceptingInput && Input.GetButtonDown("Scroll Actions")){
			currentCursor = (currentCursor + 1) % cursors.Length;
		} 
		
		if(acceptingInput && Input.GetButtonDown("Action")){
			print("cast ray");
			var ray : Ray = camera.ScreenPointToRay(Input.mousePosition);
			if(Physics.Raycast(ray, hit)){
				var obj : Interactable = hit.collider.GetComponent(Interactable);
				switch(currentCursor){
				case 0:
					print("Use()->" + obj.ToString());
					obj.Use();
					break;
				case 1:
					print("Look()->" + obj.ToString());
					obj.Look();
					break;
				default:
					break;
				}
			}
		}
		
	}
	
	function OnGUI(){
		DrawCursor();
		ShowSpeech();
	}
	
	function DrawCursor(){
		if(!acceptingInput){
			// draw a waiting cursor?
		} else {
			GUI.DrawTexture(Rect(Input.mousePosition.x, Screen.height - Input.mousePosition.y, cursorSize, cursorSize), cursors[currentCursor]);
		}
	}
	
	function ShowSpeech(){
		if(say){
			if(sayCount < (sayTick * say.Length)){
				sayCount += (Time.deltaTime * 1000.0);
			}
			
			var toSay : String = say.Substring(0, (sayCount/sayTick));
		
			var top : int = (Screen.height / 10) * 8;
			var left : int = (Screen.width / 10) * 3;
			GUI.Box(Rect(left, top, Screen.width - (left * 2), Screen.height - top - (Screen.height/20)), toSay, guiStyle);
		}
	}
	
	function RotateByMouse(){
		if(acceptingInput){
			var screenDivisions = Screen.width / 10;
			var left = screenDivisions;
			var right = screenDivisions * 9;
			
			var rotate : Vector3 = Vector3(0.0,0.0,0.0);
			if(Input.mousePosition.x < left){
				rotate.y = -mouseRotationSpeed;
			} else if (Input.mousePosition.x > right){
				rotate.y = mouseRotationSpeed;
			}
			
			transform.eulerAngles += rotate;
		}
	}
	
	function WaitingForInput() : boolean {
		return waitingForInput;
	}
	
	function IsSaying() : boolean {
		return say != null;
	}
	
	
	// EXECUTE ACTIONS
	
	function Move(){
		if(movingTime > 0 && !waitingForInput){
			var mTime : int = Time.deltaTime * 1000.0;
			movingTime -= mTime;
			if(movingTime < 0){
				// we overshot, rollback slightly
				mTime += movingTime;
				movingTime = 0;
			}
			transform.position += (movingSpeed * mTime);
		}
		
		if(movingTime == 0){
			movingSpeed = Vector3(0,0,0);
		}
	}
	
	function Rotate(){
		if(rotatingTime > 0 && !waitingForInput){
			var rTime : int = Time.deltaTime * 1000.0;
			rotatingTime -= rTime;
			if(rotatingTime < 0){
				// we overshot, rollback slightly
				rTime += rotatingTime;
				rotatingTime = 0;
			}
			transform.eulerAngles += rotatingSpeed * rTime;
			
			if(rotatingTime == 0){
				rotatingSpeed = Vector3(0,0,0);
			}
		}
	}
	
	
	function Wait(){
		if(waitingTime > 0 && !waitingForInput){
			var wTime : int = Time.deltaTime * 1000.0;
			waitingTime -= wTime;
			if(waitingTime < 0){
				// we overshot, rollback slightly
				wTime += waitingTime;
				waitingTime = 0;
			}
		}
	}

	function WaitingTime(){
		return waitingTime;
	}

	function MovingTime(){
		return movingTime;
	}
	
	function RotatingTime(){
		return rotatingTime;
	}





	// SET ACTIONS
	
	function SetMove(speed : Vector3, time : int){
		movingSpeed = speed;
		movingTime = time;
	}
	
	function SetRotate(speed : Vector3, time : int){
		rotatingSpeed = speed;
		rotatingTime = time;
	}
	
	function WaitForInput(){
		waitingForInput = true;
	}
	
	function Wait(time : int){
		waitingTime = time;
	}
	
	function Say(s : String){
		say = s;
	}
	
	function SetAcceptingInput(bool : boolean){
		acceptingInput = bool;
	}
	
	
	
}