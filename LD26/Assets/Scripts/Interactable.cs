using UnityEngine;
using System.Collections;

public abstract class Interactable : ScriptEvents {

	public abstract void Look();
	
	public abstract void Use();
	
	public abstract void UseWith(Interactable other);
}
