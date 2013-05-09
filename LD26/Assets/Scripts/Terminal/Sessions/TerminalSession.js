#pragma strict

public class TerminalSession extends MonoBehaviour{

	private var history : Array;
	
	protected var user : String;
	protected var server : String;
	
	protected var maskInput : boolean;
	protected var loggedIn : boolean;
	
	protected var files : Root;
	protected var currentDir : Directory;
	
	protected var currentProgram : Executable;
	
	function TerminalSession(){
		history = new Array();
		Welcome();
		InitializeFilesystem();
		currentDir = files;
	}

	function WriteLine(line : String){
		history.Add(line);
	}
	
	function ExecuteInput(input : String){
		if(input.Length > 0){
			if(!maskInput){
				history[history.length - 1] += input;
			} else {
				history[history.length - 1] += (input.Length * '*');
			}
		} 
		
		if(!loggedIn){
			// not logged in!
			if(user == null && input.Length > 0){
				// user has entered a username
				
				user = input.Trim();
				history.Add("Password: ");
				maskInput = true;
			} else if(input.Length > 0){
				// user has entered a password
				
				if(Login(user, input)){
					// success!
					history.Add("");
					maskInput = false;
					loggedIn = true;
					
					history.Add(Prompt());
				} else {
					// failed.
					history.Add("Login failed.");
					history.Add("");
					user = null;
					maskInput = false;
					
					history.Add("Login: ");
				}
			}
		} else if(currentProgram){
			// a program is already running; input should be handled by that program
			currentProgram.ParseInput(input);
		} else {
			// no program running; user is at a standard prompt
			var inputTokens : String[] = input.Split(" "[0]);
			var found : boolean = false;
			var bin : Directory = (files.GetChild("bin/") as Directory);
			for(var f : File in bin.GetFiles()){
				if(f instanceof Executable && inputTokens[0] == f.GetName()){
					(f as Executable).Execute(this, inputTokens);
					found = true;
				}
			}
			
			if(!found){
				if(input.Length > 0){
					history.Add("Command not found.");
				}
				history.Add(Prompt());
			}
		}
		
	
	}
	
	
	function FinishedExecuting(){
		currentProgram = null;
		ExecuteInput("");
	}
	
	// getters and setters
	
	function GetHistory() : Array{
		return history;
	}
	
	function IsMaskInput() : boolean {
		return maskInput;
	}
	
	function GetCurrentDir() : Directory {
		return currentDir;
	}
	
	function SetCurrentDir(dir : Directory) {
		currentDir = dir;
	}
	
	function GetRoot() : Root {
		return files;
	}
	
	function GetUser() : String {
		return user;
	}
	
	function SetUser(user : String){
		this.user = user;
		if(user == null){
			loggedIn = false;
		}
	}
	
	
	
	// functions which should be overridden
	function Login(user : String, pass : String) : boolean {
		return false;
	}
		
	function InitializeFilesystem(){
		files = new Root();
	
		// programs
		var bin : Directory = Directory("bin");
		bin.AddFile(Ls());
		bin.AddFile(Helpp());
		bin.AddFile(Cd());
		bin.AddFile(Clear());
		bin.AddFile(Logout());
		bin.AddFile(Pwd());
		files.AddFile(bin);
		
		// inventory
		var inv : Directory = Directory("inv");
		// 	TODO!
		files.AddFile(inv);
		
		// people in the scene (including player);
		var usr : Directory = Directory("usr");
		// TODO!
		files.AddFile(usr);
		
		// other objects in the scene
		var etc : Directory = Directory("etc");
		// TODO!
		files.AddFile(etc);
	
	}
	
	function Prompt() : String {
		return user + "@" + server + "[" + (currentDir.IsRoot() ? "/" : currentDir.GetNameNoSlash()) + "]: ";
	}
	
	function Welcome() {
		history.Add("Welcome to MorNIX 4.2");
		history.Add("Type \"help\" if you get stuck.");
		history.Add("");
		history.Add("Login: ");
	}	
	
}
