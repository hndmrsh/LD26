#pragma strict

import System.Collections.Generic;

public class ScriptEvents extends MonoBehaviour implements ScreenSizeChangeListener{

	var isGui : boolean;
	var fadeTexture : Texture2D;
	var titleStyle : GUIStyle;
	
	protected static var q : Queue.<Function>;
	protected var player : Player;
	
	private var fadeAmount : double;
	private var fadeSpeed : double;
	private var fadeTime : double;
	private var fadingIn : boolean;
	
	private var titleText : String;
	private var titleTime : int;

	// wrapper function for queueing	 
	protected function Q(func : Function, params : Object[]) : Function{
		player.SetAcceptingInput(false);
		if(!q){
			q = Queue.<Function>();
		}
		q.Enqueue((function(){func.Call(params);}));
	}
	
	// FUNCTION VARIABLES
	
	protected var move = function(positionAmt : Vector3, time : int){
		print("move(" + positionAmt.x + "," + positionAmt.y + "," + positionAmt.z + ")");
		player.SetMove(positionAmt / time, time);
	};
	
	protected var rotate = function(rotationAmt : Vector3, time : int){
		print("rotate(" + rotationAmt.x + "," + rotationAmt.y + "," + rotationAmt.z + ")");
		player.SetRotate(rotationAmt / time, time);
	};
	
	protected var say = function(s : String){
		print("say(" + s + ")");
		player.Say(s);
		player.WaitForInput();
	};
	
	protected var title = function(t : String, time : int){
		print("title(" + t + "," + time + ")");
		titleText = t;
		titleTime = time;
	};
	
	protected var wait = function(dummy : Object, time : int){
		print("wait(" + time + ")");
		player.Wait(time);
	};
	
	protected var waitForInput = function(){
		print("waitForInput()");
		player.WaitForInput();
	};
	
	protected var fadeIn = function(dummy : Object, time : int){
		print("fadeIn(" + time + ")");
		fadeAmount = 1.0;
		fadeTime = time;
		fadeSpeed = 1.0 / fadeTime;
		fadingIn = true;
	};
	
	protected var fadeOut = function(dummy : Object, time : int){
		print("fadeOut(" + time + ")");
		fadeAmount = 0.0;
		fadeTime = time;
		fadeSpeed = 1.0 / fadeTime;
		fadingIn = false;
	};
	
	protected var playSound = function(sound : AudioSource){
		print("startSound(" + sound + ")");
		sound.Play();
		
	};
	
	protected var stopSound = function(sound : AudioSource){
		print("stopSound(" + sound + ")");
		sound.Stop();
	};
	
	protected var executeEvent = function(scriptEvents : ScriptEvents, eventName : String){
		print("executeEvent(" + scriptEvents + ", " + eventName + ")");
		scriptEvents.ExecuteEvent(eventName);
	};
	
	//protected var call = function(func : Function, params : Object[]){
	//	func.Call(params);
	//};
	/// DERP!
	
	// END FUNCTION VARIABLES
	
	function Start(){
		player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
		fadeAmount = 0.0;
		
		if(isGui){
			GameInfo.RegisterScreenSizeChangeListnener(this);
		}
	}
	
	function HasNext() : boolean {
		return q.Count > 0;
	}
	
	function DoNext(){
		q.Dequeue().Call([]);
	}
	
	function Update(){
		if(HasNext()){
			if(!player.WaitingForInput() && player.WaitingTime() <= 0){
				DoNext();
				player.SetAcceptingInput(false);
			}
		} else if (player.WaitingTime() <= 0 && player.MovingTime() <= 0 && player.RotatingTime() <= 0 && !player.IsSaying()){
			player.SetAcceptingInput(true);
		}
		
		Fade();
		Title();
	}

	function OnGUI(){
		if(isGui){
			GUI.color = Color(1.0, 1.0, 1.0, fadeAmount);
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),fadeTexture);
			
			if(titleTime > 0){		
				var screenDivisions : int = (Screen.height / 10);
				GUI.Label(Rect(screenDivisions, screenDivisions, Screen.width - (screenDivisions * 2), screenDivisions * 4), titleText, titleStyle);
			}
		}
	}
	
	function OnScreenSizeChanged(){
		titleStyle.fontSize = GameInfo.titleSize;
	}
	
	function Fade(){
		if(fadeTime > 0){
			var fTime : int = Time.deltaTime * 1000.0;
			fadeTime -= fTime;
			if(fadeTime < 0){
				// we overshot, rollback slightly
				fTime += fadeTime;
				fadeTime = 0;
			}
			
			if(fadingIn){
				fadeAmount -= (fadeSpeed * fTime);
			} else {
				fadeAmount += (fadeSpeed * fTime);
			}

			// check if this is the last frame of fading; if so, set to target
			if(fadeTime == 0 && fadingIn){
				fadeAmount = 0.0;
			} else if(fadeTime == 0){
				fadeAmount = 1.0;
			}
		}
	}
	
	function Title(){
		if(titleTime > 0){
			var tTime : int = Time.deltaTime * 1000.0;
			titleTime -= tTime;
			if(titleTime < 0){
				// we overshot, rollback slightly
				tTime += titleTime;
				titleTime = 0;
			}
		}
	}
	
	function AngleToTargetY(from : float, target : float) : float{
		var iFrom : int = Mathf.RoundToInt(from % 360);
		var iTarget : int = Mathf.RoundToInt(target % 360);
		
		var angle : float = Quaternion.Angle(Quaternion.Euler(0.0,from,0.0), Quaternion.Euler(0.0, target, 0.0));
		var iAngle : int = Mathf.RoundToInt(angle);

		if(iTarget - iFrom == iAngle || (iTarget+360) - iFrom == iAngle){
			return angle;
		} else if(iFrom - iTarget == iAngle || (iFrom+360) - iTarget == iAngle){
			return -angle;
		} else {
			print("nothing");
		}
	}
	
	// override this in subclasses
	function ExecuteEvent(event : String) {}
}