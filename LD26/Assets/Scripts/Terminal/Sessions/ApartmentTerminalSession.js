#pragma strict

public class ApartmentTerminalSession extends TerminalSession{
	
	function ApartmentTerminalSession(){
		server = "apartment";
	}
	
	function Login(user : String, pass : String){
		return user == "root" && pass == "root";
	}
	
	function InitializeFilesystem() {
		files = new Root();
		
		// executables
		var bin : Directory = Directory("bin");
		bin.AddFile(Ls());
		bin.AddFile(Helpp());
		files.AddFile(bin);
		
		// root files
		files.AddFile(File("README"));
	}
}