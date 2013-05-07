#pragma strict

public class ApartmentTerminalSession extends TerminalSession{
	
	function ApartmentTerminalSession(){
		server = "apartment";
	}
	
	function Login(user : String, pass : String){
		return user == "user" && pass == "pass";
	}
	
	function InitializeFilesystem() {
		super.InitializeFilesystem();

		// root files
		files.AddFile(File("README", "morpheus", true, false));
		
		var test1 : Directory = Directory("test1", "root", false, false);
		var test2 : Directory = Directory("test2", "morpheus", false, false);
		var test3 : Directory = Directory("test3");
		test2.AddFile(test3);
		test1.AddFile(test2);
		files.AddFile(test1);
		
		files.AddFile(File("small_file"));
	}
}