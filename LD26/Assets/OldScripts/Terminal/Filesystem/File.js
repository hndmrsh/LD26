#pragma strict

public class File {

	protected var parent : Directory;
	
	protected var name : String;

	protected var owner : String;
	
	protected var globalWrite : boolean;
	protected var globalRead : boolean;
	
	function File(fileName : String){
		name = fileName;
		owner = "root";
		
		globalWrite = true;
		globalRead = true;
	}
	
	function File(fileName : String, fileOwner : String, canGlobalRead : boolean, canGlobalWrite : boolean){
		name = fileName;
		owner = fileOwner;
		
		globalWrite = canGlobalWrite;
		globalRead = canGlobalRead;
	}
	
	function PathToFile() : String {
		return (parent ? parent.PathToFile() : "") + name;
	}
	
	function GetName() : String {
		return name;
	}
	
	function SetParent(parentFile : Directory) {
		parent = parentFile;
	}
	
	function GetOwner() : String {
		return owner;
	}
	
	function GetPermissions() : String {
		var retVal : String = "";
		
		if(globalRead){
			retVal += "r";
		} else {
			retVal += "-";
		}
		
		if(globalWrite){
			retVal += "w";
		} else {
			retVal += "-";
		}
		
		retVal += "-";
		
		return retVal;
	}
	
	function GetParent() : Directory {
		return parent;
	}
	
	function TryRead(terminalSession : TerminalSession) : boolean {
		var success : boolean = globalRead || owner == terminalSession.GetUser();
		if(!success){
			terminalSession.WriteLine("Error reading " + name + ": permission denied.");
		}
		return success;
	}
	
	function TryWrite(terminalSession : TerminalSession) : boolean {
		var success : boolean = globalWrite || owner == terminalSession.GetUser();
		if(!success){
			terminalSession.WriteLine("Error writing " + name + ": permission denied.");
		}
		return success;
	}
	
	
}