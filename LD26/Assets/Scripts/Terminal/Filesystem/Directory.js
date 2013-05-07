#pragma strict

public class Directory extends File {
	
	protected var files : Array;
	
	function Directory(fileName : String){
		super(fileName);
		files = Array();
	}
	
	function Directory(fileName : String, fileOwner : String, canGlobalRead : boolean, canGlobalWrite : boolean){
		super(fileName, fileOwner, canGlobalRead, canGlobalWrite);
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
		// sort by name
		files.Sort(function(a : File, b : File){
			return a.GetName().CompareTo(b.GetName());
		});
		
		return files;
	}
	
	function GetNameNoSlash() : String {
		return super.GetName();
	}
	
	function GetName() : String {
		return super.GetName() + "/";
	}
	
	function IsRoot() : boolean {
		return !parent;
	}
}