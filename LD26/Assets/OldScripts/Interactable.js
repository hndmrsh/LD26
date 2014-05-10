#pragma strict

public class Interactable extends ScriptEvents{
	
	// to be implemented by subclasses
	function Look(){}
	
	function Use(){}
	
	function UseWith(other : Interactable){}
	
}