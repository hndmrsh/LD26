#pragma strict

public class Mv extends Executable {

	function Mv(){
		super("mv");
	}
	
	function Execute(terminalSession : TerminalSession, args : String[]){
		if(args.Length < 3){
			terminalSession.WriteLine("Usage: \"mv <source> <destination>\"");
		} else if(args.Length > 3){
			IllegalArguments(terminalSession, args);
		} else {
		
			var src : File = terminalSession.FindFile(args[1]);
			var dest : File = terminalSession.FindFile(args[2]);
			
			var destExists : boolean = terminalSession.FindFile(dest.PathToFile() + src.GetName()) != null;
			
			if(!terminalSession.ValidateMove(src, dest)){
				var toRemove : int = terminalSession.GetHistory().Count - 1;
				terminalSession.GetHistory().RemoveAt(toRemove);
			} else if(!src){
				terminalSession.WriteLine("File " + args[1] + " not found.");
			} else if(src instanceof Directory){
				terminalSession.WriteLine("Cannot move a directory.");
			} else if(!(dest instanceof Directory)){
				terminalSession.WriteLine("Destination is not a directory.");
			} else if(!dest){
				terminalSession.WriteLine("Destination " + args[2] + " not found.");
			} else if(destExists){
				terminalSession.WriteLine("File " + args[1] + " already exists in destination.");
			} else if (src.TryRead(terminalSession) && dest.TryWrite(terminalSession)){
				src.GetParent().RemoveFile(src);
				(dest as Directory).AddFile(src);
				src.SetParent((dest as Directory));
			}
		}
		
		terminalSession.FinishedExecuting();
	}
	
	function PrintHelpText(terminalSession : TerminalSession){
		terminalSession.WriteLine("Use the mv command to move a file to a new destination.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: source - the file to move, destination - the destination folder.");
	}

}