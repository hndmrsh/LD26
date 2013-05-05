#pragma strict

public class TerminalSession {

	var history : List.<String>;
	var maxLines : int;
	
	var user : String;
	var prompt : String;
	
	var files : File;
	
	function TerminalSession(someFiles : File){
		files = someFiles;
	}

	function WriteLine(line : String){
		history.Add(line);
	}
	
	function Clear(){
		history.Clear();
	}
}