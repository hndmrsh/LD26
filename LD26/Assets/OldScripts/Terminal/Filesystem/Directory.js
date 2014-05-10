#pragma strict

import System.Collections.Generic;

public class Directory extends File {
	
	protected var files : List.<File>;
	
	function Directory(fileName : String){
		super(fileName);
		files = List.<File>();
	}
	
	function Directory(fileName : String, fileOwner : String, canGlobalRead : boolean, canGlobalWrite : boolean){
		super(fileName, fileOwner, canGlobalRead, canGlobalWrite);
		files = List.<File>();
	}
	
	function PathToFile() : String {
		return super.PathToFile() + "/";
	}
	
	function AddFile(file : File){
		file.SetParent(this);
		files.Add(file);
	}
	
	function RemoveFile(file : File){
		var toRemove : int = -1;
		for(var i : int = 0; i < files.Count; i++){
			print(i + ":" + files[i].PathToFile());
			print(i + ":" + file.PathToFile());
			if(files[i].PathToFile() == file.PathToFile()){
				toRemove = i;
				break;
			}
		}
		
		if(toRemove > -1){
			files.RemoveAt(toRemove);
		}
	}
	
	function GetChild(childName : String) : File {
		for(var f : File in files){
			if(f.GetName() == childName){
				return f;
			}	
		}
		
		return null;
	}
	
	function GetFiles() : List.<File> {
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