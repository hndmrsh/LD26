#pragma strict

public class Logout extends Executable {

	function Logout(){
		super("logout");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		if(args.length > 1){
			IllegalArguments(terminalSession, args);
		} else {
			terminalSession.SetUser(null);
			terminalSession.GetHistory().Clear();
			terminalSession.SetCurrentDir(terminalSession.GetRoot());
			terminalSession.Welcome();
		}
		terminalSession.FinishedExecuting();
	}
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the logout command to logout of the system.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: (none).");
	}

}