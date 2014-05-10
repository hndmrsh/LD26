#pragma strict

public class Cd extends Executable {

	private var terminalSession : TerminalSession;
	
	function Cd(){
		super("cd");
	}
	
	function Execute(term : TerminalSession, args : String[]){
		terminalSession = term;
		
		if(args.Length == 1){
			terminalSession.WriteLine("Usage: \"cd <target directory>\"");
		} else if(args.Length > 2){
			IllegalArguments(terminalSession, args);
		} else {
			var dest : File = terminalSession.FindFile(args[1]);
			if(!dest){
				// directory not found (or no permissions!)!
				terminalSession.WriteLine("Can't change into directory: " + args[1]);
			} else if(dest instanceof Directory){
				terminalSession.SetCurrentDir(dest);
			} else {
				terminalSession.WriteLine(args[1] + " is not a directory");
			}
		
		}
		
		terminalSession.FinishedExecuting();
	}
	
	
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the cd command to navigate to another folder in the filesystem.");
		terminalSession.WriteLine("You can use relative paths or absolute paths. For example, use \"cd etc\" to move from here");
		terminalSession.WriteLine("to the etc directory; cd ../bin\" to move up one directory, and then to the bin directory;");
		terminalSession.WriteLine("or \"/inv/\" to move to the inv directory located in the root directory.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: target directory - directory to change to.");
	}

}