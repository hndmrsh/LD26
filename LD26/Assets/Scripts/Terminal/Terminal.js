#pragma strict

import System.Collections.Generic;

public class Terminal extends ScriptEvents implements ScreenSizeChangeListener {

	var guiStyle : GUIStyle;
	
	private var x : int;
	private var y : int;
	private var width : int;
	private var height : int;
	
	private var on : boolean;
	
	private var terminalSession : TerminalSession;
	
	function Start() {
		super.Start();
		OnScreenSizeChanged();
		GameInfo.RegisterScreenSizeChangeListnener(this);
		
		terminalSession = TerminalSession(null);
	}
	
	function OnGUI() {
		if(on){
			// update font size in case window size has changed
			if(guiStyle.fontSize != GameInfo.terminalSize){
				guiStyle.fontSize = GameInfo.terminalSize;
				terminalSession.maxLines = height / GameInfo.terminalSize;
			}
		
			GUI.Box(Rect(x, y, width, height), "Login:", guiStyle); // Temporary!!!!
		}
	}
	
	function SwitchState() {
		on = !on;
		player.SetUsingTerminal(on);
	}
	
	function OnScreenSizeChanged(){
		x = Screen.width / 4.6;
		y = Screen.height / 8.5;
		width = Screen.width - (x*2);
		height = Screen.height - (y*2);
		print("terminal now = (" + x + "," + y + "," + width + "," + height + ")");
	}

	function IsOn() : boolean {
		return on;
	}
}