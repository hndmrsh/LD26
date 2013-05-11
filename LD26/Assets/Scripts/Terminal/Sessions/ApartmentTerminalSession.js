#pragma strict

public class ApartmentTerminalSession extends TerminalSession{
	
	function ApartmentTerminalSession(){
		server = "apartment";
	}
	
	function Login(user : String, pass : String){
		return user == GameInfo.protagonistName && pass == "pass";
	}
	
	function InitializeFilesystem() {
		super.InitializeFilesystem();

		// root files
		files.AddFile(TextFile("README", "morpheus", false, false, [
			GameInfo.protagonistName + ".",
			"",
			"It's time to leave."
		]));

	}
}