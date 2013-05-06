#pragma strict

public class Ls extends Executable {

	function Ls(){
		super("ls");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		if(args.length > 1){
			IllegalArguments(terminalSession, args);
		} else {
			for(var f : File in terminalSession.GetCurrentDir().GetFiles()){
				terminalSession.WriteLine(f.GetName());
			}
		}
		
		terminalSession.FinishedExecuting();
	}

}