#pragma strict

public class File {

	protected var parent : Directory;
	
	protected var name : String;

	function File(fileName : String){
		name = fileName;
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
	
	
}