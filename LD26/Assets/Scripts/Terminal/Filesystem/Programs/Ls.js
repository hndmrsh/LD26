#pragma strict

public class Ls extends Executable {

	private var ownerWidth : int = 10;
	
	function Ls(){
		super("ls");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		if(args.length > 1){
			IllegalArguments(terminalSession, args);
		} else {
			for(var f : File in terminalSession.GetCurrentDir().GetFiles()){
				terminalSession.WriteLine(f.GetOwner() + (' ' * (ownerWidth - f.GetOwner().Length)) + "    |" + f.GetPermissions() + "|    " + f.GetName());
			}
		}
		terminalSession.FinishedExecuting();
	}
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the ls command to list the files in the current directory.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: (none).");
	}

}