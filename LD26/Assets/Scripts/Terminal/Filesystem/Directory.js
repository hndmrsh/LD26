#pragma strict

public class Directory extends File {
	
	protected var files : Array;
	
	function Directory(fileName : String){
		super(fileName);
		files = Array();
	}
	
	function PathToFile() : String {
		return super.PathToFile() + "/";
	}
	
	function AddFile(file : File){
		file.SetParent(this);
		files.Add(file);
	}
	
	function GetChild(childName : String) : File {
		for(var f : File in files){
			if(f.GetName() == childName){
				return f;
			}	
		}
		
		return null;
	}
	
	function GetFiles() : Array {
		return files;
	}
	
	function GetName() : String {
		return super.GetName() + "/";
	}

}