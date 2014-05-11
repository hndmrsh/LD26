using UnityEngine;
using System.Collections;

public class Inventory : MonoBehaviour {

	[SerializeField]
	private int
		height;

	[SerializeField]
	private int
		expandSpeed;
	
	private int position;
	private Player player;

	// Use this for initialization
	void Start() {
		position = -height + 1;
		player = gameObject.GetComponent<Player>();
	}

	void OnGUI() {
		UpdatePosition();	
		DrawInventory();
	}

	private void UpdatePosition() {
		if (player.AcceptingInput && (Screen.height - Input.mousePosition.y) <= (position + height) && position < 0) {
			print("expanding");
			position += expandSpeed;
			ConstrictPosition();
		} else if ((!player.AcceptingInput || (Screen.height - Input.mousePosition.y) > (position + height)) && position > (-height + 1)) {
			print("retracting");
			position -= expandSpeed;
			ConstrictPosition();
		}
	}
	
	private void ConstrictPosition() {
		if (position > 0) {
			position = 0;		
		} else if (position < (-height + 1)) {
			position = -height + 1;
		}
	}
	
	private void DrawInventory() {
		GUI.Box(new Rect(0, position, Screen.width, height), "");
	}
}
