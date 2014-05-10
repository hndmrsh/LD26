#pragma strict

public class Executable extends File {

	function Executable(fileName : String){
		super(fileName, "root", false, false);
	}
	
	function IllegalArguments(terminalSession : TerminalSession, args : String[]) : String{
		var illegal : String = "";
		for(var a : int = 1; a < args.length; a++){
			illegal += args[a] + " ";
		}
		terminalSession.WriteLine("Illegal arguments: " + illegal);
	}

	function GetPermissions() : String {
		var perms : String = super.GetPermissions();
		
		return perms.Substring(0, perms.Length - 1) + "x";
	}
	
	// to override in children
	function Execute(terminalSession : TerminalSession, args : String[]){}
	function ParseInput(input : String){}
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("No help text available.");
	}
	
}