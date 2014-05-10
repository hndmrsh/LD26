#pragma strict

public class Helpp extends Executable {

	function Helpp(){
		super("help");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		if(args.length == 2){ // one arg
			if(!HelpWithCommand(terminalSession, args[1])){ // print help text for a given command
				IllegalArguments(terminalSession, args); // user didn't specify a real command :(
			}
		} else if(args.length > 2){
			IllegalArguments(terminalSession, args);
		} else {
			terminalSession.WriteLine("help --- MorNIX 4.2");
			terminalSession.WriteLine("");
			terminalSession.WriteLine("For a list of commands, view the contents of the /bin/ directory.");
			terminalSession.WriteLine("(To do this, type \"cd /bin\" (without quotes), followed by the command \"ls\")");
			terminalSession.WriteLine("");
			terminalSession.WriteLine("For help on a certain command, type \"help <command>\".");
		}
		
		terminalSession.FinishedExecuting();
	}
	
	function HelpWithCommand(terminalSession : TerminalSession, cmd : String) : boolean {
		for(var c : File in parent.GetFiles()){
			if(c.GetName() == cmd && c instanceof Executable){
				(c as Executable).PrintHelpText(terminalSession);
				return true;
			}
		}
		
		return false;
	}
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the help command to get help using the system, or help using a specific command.");
			terminalSession.WriteLine("Arguments: command (optional) - help for a specific command.");
	}

}