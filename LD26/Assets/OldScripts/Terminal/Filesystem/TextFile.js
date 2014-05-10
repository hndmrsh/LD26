#pragma strict

public class TextFile extends File {

	private var contents : String[];
	
	function TextFile(fileName : String, fileOwner : String, canGlobalRead : boolean, canGlobalWrite : boolean, fileContents : String[]){
		super(fileName, fileOwner, canGlobalRead, canGlobalWrite);
		contents = fileContents;
	}
	
	function TextFile(fileName : String, fileContents : String[]){
		super(fileName);
		contents = fileContents;
	}
	
	function GetContents() : String[] {
		return contents;
	}
	
}