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
			var src : Directory;
			
			var target : String = args[1];
			
			// special case: '/'
			if(target == "/"){
				terminalSession.SetCurrentDir(terminalSession.GetRoot());
			} else {
				var path : String;
				if(target.StartsWith("/")){
					src = terminalSession.GetRoot();
					path = target.Substring(1);
				} else {
					src = terminalSession.GetCurrentDir();
					path = target;
				}
				
				if(path.EndsWith("/")){
					path = path.Substring(0, path.Length - 1);
				}
				
				var dest : Directory = NavigateTo(src, path);
				
				if(!dest){
					// directory not found (or no permissions!)!
					terminalSession.WriteLine("Can't change into directory: " + target);
				} else {
					terminalSession.SetCurrentDir(dest);
				}
			}
		}
		
		terminalSession.FinishedExecuting();
	}
	
	function NavigateTo(src : Directory, target : String) : Directory{
		if(src == null){
			// we are at an invalid location (e.g. ".." was passed at the root!)
			// or the previous directory was not found
			return null;
		} else if(target == null){
			return src;
		}
		
		var dirToSearch : String;
		var remainder : String;
		
		var splitPoint : int = target.IndexOf("/");
		if(splitPoint > -1){
			dirToSearch = target.Substring(0, splitPoint);
			remainder = target.Substring(splitPoint+1);
		} else {
			// we are at the last directory to navigate to!
			dirToSearch = target;
			remainder == null;
		}
		
		// special cases '.' and '..'
		if(dirToSearch == "."){
			return NavigateTo(src, remainder);
		} else if(dirToSearch == ".."){
			return NavigateTo(src.GetParent(), remainder);
		}
		
		// locate the requested directory
		var dir : Directory = null;
		for(var file : File in src.GetFiles()){
			if(file instanceof Directory){
				var d : Directory = (file as Directory);
				if(d.GetNameNoSlash() == dirToSearch){
					dir = d;
				}
			}
		}
		
		if(dir.TryRead(terminalSession)){
			return NavigateTo(dir, remainder);
		} else {
			return NavigateTo(null, remainder);
		}
		
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