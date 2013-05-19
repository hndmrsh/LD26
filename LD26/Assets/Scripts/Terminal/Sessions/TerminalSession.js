#pragma strict

import System.Collections.Generic;

public class TerminalSession extends ScriptEvents {

	private var history : List.<String>;
	
	protected var user : String;
	protected var server : String;
	
	protected var maskInput : boolean;
	protected var loggedIn : boolean;
	
	protected var files : Root;
	protected var currentDir : Directory;
	
	protected var currentProgram : Executable;
	
	private var scrollOffset : int = 0;
	
	function TerminalSession(){
		history = List.<String>();
		Welcome();
		InitializeFilesystem();
		currentDir = files;
	}

	function WriteLine(line : String){
		history.Add(line);
	}
	
	function ExecuteInput(input : String){
		input = input.TrimEnd();
		
		if(input.Length > 0){
			if(!maskInput){
				history[history.Count - 1] += input;
			} else {
				history[history.Count - 1] += (input.Length * '*');
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

			// check the bin directory for an executable program
			// if found, load as current program
			var bin : Directory = (files.GetChild("bin/") as Directory);
			for(var f : File in bin.GetFiles()){
				if(f instanceof Executable && inputTokens[0] == f.GetName()){
					currentProgram = (f as Executable);
				}
			}
			
			// if the program wasn't found, try looking in the current directory
			if(!currentProgram){
				for(var f : File in currentDir.GetFiles()){
					if(f instanceof Executable && inputTokens[0] == f.GetName()){
						currentProgram = (f as Executable);
					}
				}
			}
			
			if(currentProgram){
				currentProgram.Execute(this, inputTokens);
			} else {
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
	
	
	function FindFile(target : String) : File {
		var src : Directory;
			
		//var target : String = args[1];
		
		// special case: '/'
		if(target == "/"){
			return files;
		} else {
			var path : String;
			if(target.StartsWith("/")){
				src = files;
				path = target.Substring(1);
			} else {
				src = currentDir;
				path = target;
			}
			
			if(path.EndsWith("/")){
				path = path.Substring(0, path.Length - 1);
			}
			
			return FindFile(src, path);
			
		}	
	}
	
	private function FindFile(src : Directory, target : String) : File {
		//if(src == null){
			// we are at an invalid location (e.g. ".." was passed at the root!)
			// or the previous directory was not found
			//return null;
		//} else if(target == null){
		if(target == null){
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
			return FindFile(src, remainder);
		} else if(dirToSearch == ".."){
			return FindFile(src.GetParent(), remainder);
		}
		
		// locate the requested file or directory
		var requested : File = null;
		var isDir : boolean = false;
		for(var file : File in src.GetFiles()){
			if(file instanceof Directory && (file as Directory).GetNameNoSlash() == dirToSearch){
				requested = file;
				isDir = true;
			} else if (file.GetName() == dirToSearch){
				requested = file;
			}
		}
		
		if(requested && requested.TryRead(this)){
			if(isDir){
				return FindFile((requested as Directory), remainder);
			} else if(remainder == null){
				return requested;
			} else {
				return null;
			}
		} else {
			return null;
		}
		
	}
	
	function Prompt() : String {
		return user + "@" + server + "[" + (currentDir.IsRoot() ? "/" : currentDir.GetNameNoSlash()) + "]: ";
	}
	
	function Welcome() {
		history.Add("Welcome to " + GameInfo.osName + " 4.2");
		history.Add("Type \"help\" if you get stuck.");
		history.Add("");
		history.Add("Login: ");
	}
	
	function AddFile(fileToAdd : File, location : String){
		var dest : Directory = FindFile(location);
		if(!dest || !(dest instanceof Directory)){
			print("ERROR! tried to add file to a non-directory");
		} else {
			dest.AddFile(fileToAdd);
		}
	}
	
	
	// terminal scrolling functions
	
	function ScrollUp(maxLines : int) {
		print("scroll up");
		if(scrollOffset > (-history.Count + maxLines)) { 
			scrollOffset--;
		}
	}
	
	function ScrollDown(){
		print("scroll down");
		if(scrollOffset < 0) { 
			scrollOffset++;
		}
	}
	
	function ScrollToBottom(){
		scrollOffset = 0;
	}
	
	
	
	
	// getters and setters
	
	function GetHistory() : List.<String> {
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
	
	function GetScrollOffset() : int {
		return scrollOffset;
	}
	
	
	
	
	
	
	// functions which should be overridden
	function Login(user : String, pass : String) : boolean {
		return false;
	}
		
	function InitializeFilesystem(){
		files = new Root();
	
		// programs
		var bin : Directory = Directory("bin", "root", true, false);
		bin.AddFile(Ls());
		bin.AddFile(Helpp());
		bin.AddFile(Cd());
		bin.AddFile(Clear());
		bin.AddFile(Logout());
		bin.AddFile(Pwd());
		bin.AddFile(Cat());
		bin.AddFile(Mv());
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
		var etc : Directory = Directory("etc", "root", true, false);
		// TODO!
		// files added to etc from the scene should be write-protected by default,
		// but this can be changed for certain files if necessary.
		
		// TODO!
		files.AddFile(etc);
	
	}
	
	// the following functions are called before when a file is modified on the file system,
	// and can be overridden to prevent the user from doing things he/she shouldn't.
	function ValidateMove(src : File, dest : Directory) : boolean {
		return true;
	}
	
	function ValidateRemove(file : File) : boolean {
		return true;
	}
	
	function ValidateRename(file : File) : boolean {
		return true;
	}
	
	function PostCat(file : File) {}
}
