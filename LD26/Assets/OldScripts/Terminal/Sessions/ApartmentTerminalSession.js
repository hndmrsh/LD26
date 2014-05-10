#pragma strict

public class ApartmentTerminalSession extends TerminalSession{
	
	private var readReadme : boolean = false;
	
	function ApartmentTerminalSession(){
		server = "apartment";
	}
	
	function Login(user : String, pass : String){
		return user == GameInfo.protagonistName && pass == "pass";
	}
	
	function InitializeFilesystem() {
		super.InitializeFilesystem();

		// root files
		files.AddFile(TextFile("README", "morpheus", true, false, [
			GameInfo.protagonistName + ".",
			"",
			"It's time to leave."
		]));

	}
	
	function ValidateMove(src : File, dest : Directory) : boolean {
		Q(say, ["I don't want to move any files around on this drive."]);
		Q(say, ["Who knows, this may become evidence later."]);
		return false;
	}
	
	function ValidateRemove(file : File) : boolean {
		Q(say, ["I don't think I want to try deleting files just yet... Especially when I don't know what any of them do."]);
		return false;
	}
	
	function ValidateRename(file : File) : boolean {
		Q(say, ["I'm not renaming any of these files."]);
		return false;
	}
	
	function PostCat(file : File){
		if(file.GetName() == "README" && !readReadme){
			Q(say, ["What does this mean?"]);
			readReadme = true;
		}
	}
}