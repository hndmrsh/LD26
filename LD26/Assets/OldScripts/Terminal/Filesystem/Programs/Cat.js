#pragma strict

public class Cat extends Executable {

	function Cat(){
		super("cat");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		if(args.Length == 1){
			terminalSession.WriteLine("Usage: \"cat <filename>\"");
		} else if(args.Length > 2){
			IllegalArguments(terminalSession, args);
		} else {
			var f : File = terminalSession.FindFile(args[1]);
			if(!f){
				terminalSession.WriteLine("File " + args[1] + " not found.");
			} else if(!(f instanceof TextFile)){
				terminalSession.WriteLine(args[1] + " is not a text file.");
			} else if (f.TryRead(terminalSession)){
				for(var line : String in (f as TextFile).GetContents()){
					terminalSession.WriteLine(line);
				}
				terminalSession.PostCat(f);
			}
		}
		
		terminalSession.FinishedExecuting();
	}
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the cat command to output the contents of a text file.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: filename - the file to output.");
	}

}