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
		terminalSession.WriteLine("Use the ls command to list the files in the current directory. The output consists");
		terminalSession.WriteLine("of the following:");
		terminalSession.WriteLine(" - The owner of the file.");
		terminalSession.WriteLine(" - The file permissions.");
		terminalSession.WriteLine(" - The file name.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Regarding file permissions: if any user can read and write the file, the permissions");
		terminalSession.WriteLine("include a \"r\" and a \"w\" respectively. Regardless of the permissions set, the");
		terminalSession.WriteLine("owner of a file can always read/write. An \"x\" in the third column denotes an");
		terminalSession.WriteLine("executable file - type the name of the file while in the directory to execute it.");
		terminalSession.WriteLine("");
		terminalSession.WriteLine("Arguments: (none).");
	}

}