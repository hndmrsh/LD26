using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour, ScreenSizeChangeListener {

	private const int CURSOR_SIZE = 32;
	private const int SAY_TICK = 70; // number of ms to wait between printing characters
	private const float MOUSE_ROTATION_SPEED = 1.0f;

	[SerializeField]
	private ScriptEvents
		scriptEvents;
	[SerializeField]
	private Texture2D[]
		cursors;
	
	[SerializeField]
	private GUIStyle
		guiStyle;
	private RaycastHit hit;
	
	private Vector3 rotatingSpeed;
	public int RotatingTime { get; set; }
	
	private Vector3 movingSpeed;
	public int MovingTime { get; set; }
	
	public int WaitingTime { get; set; }
	public bool WaitingForInput { get; set; }
	
	public string Say { get; set; }
	private int sayCount;
	
	public bool AcceptingInput { get; set; }
	public bool UsingTerminal { get; set; }
	
	private int currentCursor = 0;

	// Use this for initialization
	void Start() {
		Screen.showCursor = false;
		GameInfo.RegisterScreenSizeChangeListnener(this);
		
		scriptEvents.ExecuteEvent(ApartmentScriptEvents.ApartmentScriptEventNames.WAKE_UP);
	}
	
	// Update is called once per frame
	void Update() {
		CheckForInput();
		
		// run scripted actions
		Move();
		Rotate();
		Wait();
		
		// check if mouse is on edge of screen; if so, rotate
		RotateByMouse();
	}

	void OnGUI() {
		DrawCursor();
		ShowSpeech();
	}

	private void CheckForInput() {
		if (Input.GetButtonDown("Quit")) {
			print("quit");
			Application.Quit();
		} 
		
		if (Input.GetButtonDown("Advance Text") && Say != null) {
			if (sayCount < (SAY_TICK * Say.Length)) {
				sayCount = (SAY_TICK * Say.Length);
			} else {
				// clear the current text
				Say = null;
				sayCount = 0;
				WaitingForInput = false;
			}
		} 
		
		if (AcceptingInput && Input.GetButtonDown("Scroll Actions")) {
			currentCursor = (currentCursor + 1) % cursors.Length;
		} 
		
		if (AcceptingInput && Input.GetButtonDown("Action")) {
			print("cast ray");
			Ray ray = camera.ScreenPointToRay(Input.mousePosition);
			if (Physics.Raycast(ray, out hit)) {
				Interactable obj = hit.collider.GetComponent<Interactable>();
				switch (currentCursor) {
					case 0:
						print("Use()->" + obj.ToString());
						obj.Use();
						break;
					case 1:
						print("Look()->" + obj.ToString());
						obj.Look();
						break;
					default:
						break;
				}
			}
		}
	}

	private void DrawCursor() {
		if (!AcceptingInput) {
			// draw a waiting cursor?
		} else {
			GUI.DrawTexture(new Rect(Input.mousePosition.x, Screen.height - Input.mousePosition.y, CURSOR_SIZE, CURSOR_SIZE), cursors [currentCursor]);
		}
	}
	
	private void ShowSpeech() {
		if (Say != null) {
			if (sayCount < (SAY_TICK * Say.Length)) {
				sayCount += (int)(Time.deltaTime * 1000.0);
			}
			
			string toSay = Say.Substring(0, (sayCount / SAY_TICK));
			
			int top = (Screen.height / 10) * 8;
			int left = (Screen.width / 10) * 3;
			GUI.Box(new Rect(left, top, Screen.width - (left * 2), Screen.height - top - (Screen.height / 20)), toSay, guiStyle);
		}
	}
	
	private void RotateByMouse() {
		if (AcceptingInput && !UsingTerminal) {
			float screenDivisions = Screen.width / 10f;
			float left = screenDivisions;
			float right = screenDivisions * 9f;
			
			Vector3 rotate = new Vector3(0.0f, 0.0f, 0.0f);
			if (Input.mousePosition.x < left) {
				rotate.y = -MOUSE_ROTATION_SPEED;
			} else if (Input.mousePosition.x > right) {
				rotate.y = MOUSE_ROTATION_SPEED;
			}
			
			transform.eulerAngles += rotate;
		}
	}

	public bool IsSaying() {
		return Say != null;
	}

	public void OnScreenSizeChanged() {
		guiStyle.fontSize = GameInfo.SpeechSize;
	}

	#region Execute actions
	
	private void Move() {
		if (MovingTime > 0 && !WaitingForInput) {
			int mTime = (int)(Time.deltaTime * 1000.0);
			MovingTime -= mTime;
			if (MovingTime < 0) {
				// we overshot, rollback slightly
				mTime += MovingTime;
				MovingTime = 0;
			}
			transform.position += (movingSpeed * mTime);
		}
		
		if (MovingTime == 0) {
			movingSpeed = new Vector3(0.0f, 0.0f, 0.0f);
		}
	}
	
	private void Rotate() {
		if (RotatingTime > 0 && !WaitingForInput) {
			int rTime = (int)(Time.deltaTime * 1000.0);
			RotatingTime -= rTime;
			if (RotatingTime < 0) {
				// we overshot, rollback slightly
				rTime += RotatingTime;
				RotatingTime = 0;
			}
			transform.eulerAngles += rotatingSpeed * rTime;
			
			if (RotatingTime == 0) {
				rotatingSpeed = new Vector3(0.0f, 0.0f, 0.0f);
			}
		}
	}

	private void Wait() {
		if (WaitingTime > 0 && !WaitingForInput) {
			int wTime = (int)(Time.deltaTime * 1000.0);
			WaitingTime -= wTime;
			if (WaitingTime < 0) {
				// we overshot, rollback slightly
				wTime += WaitingTime;
				WaitingTime = 0;
			}
		}
	}

	#endregion

	#region Setters

	public void SetMove(Vector3 speed, int time) {
		movingSpeed = speed;
		MovingTime = time;
	}
	
	public void SetRotate(Vector3 speed, int time) {
		rotatingSpeed = speed;
		RotatingTime = time;
	}

	#endregion
}
