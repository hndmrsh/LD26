#pragma strict

public class Pwd extends Executable {

	function Pwd(){
		super("pwd");
	}

	function Execute(terminalSession : TerminalSession, args : String[]){
		terminalSession.WriteLine(terminalSession.GetCurrentDirectory().PathToFile());
		terminalSession.FinishedExecuting();
	}

	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the pwd command to output the directory you are currently in.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: (none).");
	}

}
