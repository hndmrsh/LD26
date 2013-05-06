#pragma strict

public class Helpp extends Executable {

	function Helpp(){
		super("help");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		if(args.length == 2){ // one arg
			if(!HelpWithCommand(terminalSession, args[1])){
				IllegalArguments(terminalSession, args); // user didn't specify a real command :(
			}
		} else if(args.length > 2){
			IllegalArguments(terminalSession, args);
		} else {
			terminalSession.WriteLine("help --- MorNIX 4.2");
			terminalSession.WriteLine("");
			terminalSession.WriteLine("For a list of commands, view the contents of the /bin/ directory.");
			terminalSession.WriteLine("(To do this, type \"cd /bin/\" (without quotes), followed by the command \"ls\")");
			terminalSession.WriteLine("");
			terminalSession.WriteLine("For help on a certain command, type \"help <COMMAND>\".");
		}
		
		terminalSession.FinishedExecuting();
	}
	
	function HelpWithCommand(terminalSession : TerminalSession, cmd : String) {
		switch(cmd){
		case "ls":
			terminalSession.WriteLine("Use the ls command to list the files in the current directory.");
			terminalSession.WriteLine("Arguments: none.");
			
			return true;
		case "help":
			terminalSession.WriteLine("The help command provides system help, or help for a specific command.");
			terminalSession.WriteLine("Arguments: command (optional) - help for a specific command.");
			
			return true;
		default:
			return false;
		}
	}

}