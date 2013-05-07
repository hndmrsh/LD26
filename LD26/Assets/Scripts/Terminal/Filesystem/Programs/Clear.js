#pragma strict

public class Clear extends Executable {

	function Clear(){
		super("clear");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		terminalSession.GetHistory().Clear();
		terminalSession.FinishedExecuting();
	}
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("The clear command simply clears the current terminal display.");
		terminalSession.WriteLine("You can use relative paths or absolute paths. For example, use \"cd etc\" to move from here to the etc directory;");
		terminalSession.WriteLine("cd ../bin\" to move up one directory, and then to the bin directory; or \"/inv/\" to move to the inv directory located");
		terminalSession.WriteLine("in the root directory.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: (none).");
	}

}