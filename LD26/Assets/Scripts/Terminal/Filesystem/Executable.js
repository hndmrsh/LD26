#pragma strict

public class Executable extends File {

	function Executable(fileName : String){
		super(fileName);
	}
	
	function IllegalArguments(terminalSession : TerminalSession, args : String[]) : String{
		var illegal : String = "";
		for(var a : int = 1; a < args.length; a++){
			illegal += args[a] + " ";
		}
		terminalSession.WriteLine("Illegal arguments: " + illegal);
	}

	// to override in children
	function Execute(terminalSession : TerminalSession, args : String[]){}
	function ParseInput(input : String){}
	
}