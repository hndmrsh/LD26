#pragma strict

public class TerminalSession extends MonoBehaviour{

	private var history : Array;
	private var maxLines : int;
	
	private var user : String;
	private var prompt : String;
	
	protected var files : File;
	
	function TerminalSession(){
		history = new Array();
		history.Add("Login: ");	
	}

	function WriteLine(line : String){
		history.Add(line);
	}
	
	function Clear(){
		history.Clear();
	}
	
	function ExecuteInput(input : String){
		history[history.length - 1] += input;
		
		// if(runningProgram != null){ runningProgram.ExecuteInput(input); }
		
		history.Add("Unknown user.");
		history.Add("Login: ");
	}
	
	
	// getters and setters
	function GetMaxLines() : int{
		return maxLines;
	}
	
	function GetHistory() : Array{
		return history;
	}
	
	function SetMaxLines(lines : int){
		maxLines = lines;
	}
	
}