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
		history.Add("Welcome to MorNIX 4.2");
		history.Add("Use the help command for a list of commands available on this system.");
		history.Add("");
		history.Add("Login: ");
		
		InitializeFilesystem();
		currentDir = files;
	}

	function WriteLine(line : String){
		history.Add(line);
	}
	
	function Clear(){
		history.Clear();
	}
	
	function ExecuteInput(input : String){
		if(!maskInput){
			history[history.length - 1] += input;
		} else {
			history[history.length - 1] += (input.Length * '*');
		}
		
		// first, check if we are logged in
		if(!loggedIn){
			// not logged in!
			if(user == null){
				// user has entered a username
				
				user = input;
				history.Add("Password: ");
				maskInput = true;
			} else {
				// user has entered a password
				
				if(Login(user, input)){
					// success!
					history.Add("");
					maskInput = false;
					loggedIn = true;
					
					history.Add(user + "@" + server + "[" + currentDir.GetName() + "]: ");
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
				history.Add("Command not found.");
				history.Add(user + "@" + server + "[" + currentDir.GetName() + "]: ");
			}
		}
		
	
	}
	
	
	function FinishedExecuting(){
		currentProgram = null;
		history.Add(user + "@" + server + "[" + currentDir.GetName() + "]: ");
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
	
	// functions which should be overridden
	function Login(user : String, pass : String) : boolean {
		return false;
	}
	
	function ExecuteProgram(input : String){}
	
	function InitializeFilesystem(){}
}
