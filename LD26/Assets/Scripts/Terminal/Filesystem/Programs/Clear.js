#pragma strict

public class Clear extends Executable {

	function Clear(){
		super("clear");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		terminalSession.GetHistory().Clear();
		terminalSession.ScrollToBottom();
		terminalSession.FinishedExecuting();
	}
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the clear command to clear the current terminal display.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: (none).");
	}

}
