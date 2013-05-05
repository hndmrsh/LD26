#pragma strict

import System.Collections.Generic;

public class Directory extends File {
	
	private var files : List.<File>;
	
	function Directory(n : String, someFiles : List.<File>){
		name = n;
		files = someFiles;
	}

}