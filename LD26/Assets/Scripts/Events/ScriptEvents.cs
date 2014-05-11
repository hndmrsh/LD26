using UnityEngine;
using System.Collections.Generic;
using System;

public abstract class ScriptEvents : MonoBehaviour, ScreenSizeChangeListener {

	private bool isGui;
	private Texture2D fadeTexture;
	private GUIStyle titleStyle;

	private static Queue<ScriptFunction> q;
	protected Player player;
	
	public float FadeAmount { get; set; }
	public float FadeSpeed { get; set; }
	public float FadeTime { get; set; }
	public bool FadingIn { get; set; }
	
	public string TitleText { get; set; }
	public int TitleTime { get; set; }

	protected void Q(ScriptFunction function) {
		player.AcceptingInput = false;
		if (q == null) {
			q = new Queue<ScriptFunction>();
		}

		q.Enqueue(function);
	}

	// Use this for initialization
	void Start() {
		player = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
		FadeAmount = 0.0f;
		
		if (isGui) {
			GameInfo.RegisterScreenSizeChangeListnener(this);
		}
	}
	
	// Update is called once per frame
	void Update() {
		if (HasNext()) {
			if (!player.WaitingForInput && player.WaitingTime <= 0) {
				DoNext();
				player.AcceptingInput = false;
			}
		} else if (player.WaitingTime <= 0 && player.MovingTime <= 0 && player.RotatingTime <= 0 && !player.IsSaying()) {
			player.AcceptingInput = true;
		}
		
		DoFade();
		DoTitle();
	}

	private bool HasNext() {
		return q.Count > 0;
	}
	
	private void DoNext() {
		q.Dequeue().Execute();
	}

	public void OnScreenSizeChanged() {
		titleStyle.fontSize = GameInfo.TitleSize;
	}

	void OnGUI() {
		if (isGui) {
			GUI.color = new Color(1.0f, 1.0f, 1.0f, FadeAmount);
			GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), fadeTexture);
			
			if (TitleTime > 0) {		
				int screenDivisions = (Screen.height / 10);
				GUI.Label(new Rect(screenDivisions, screenDivisions, Screen.width - (screenDivisions * 2), screenDivisions * 4), TitleText, titleStyle);
			}
		}
	}

	private void DoFade() {
		if (FadeTime > 0) {
			int fTime = (int)(Time.deltaTime * 1000.0);
			FadeTime -= fTime;
			if (FadeTime < 0) {
				// we overshot, rollback slightly
				fTime += (int)FadeTime;
				FadeTime = 0;
			}
			
			if (FadingIn) {
				FadeAmount -= (FadeSpeed * fTime);
			} else {
				FadeAmount += (FadeSpeed * fTime);
			}

			// check if this is the last frame of fading; if so, set to target
			if (FadeTime == 0 && FadingIn) {
				FadeAmount = 0.0f;
			} else if (FadeTime == 0) {
				FadeAmount = 1.0f;
			}
		}
	}

	private void DoTitle() {
		if (TitleTime > 0) {
			int tTime = (int)(Time.deltaTime * 1000.0);
			TitleTime -= tTime;
			if (TitleTime < 0) {
				// we overshot, rollback slightly
				tTime += TitleTime;
				TitleTime = 0;
			}
		}
	}
	
	private  float AngleToTargetY(float from, float target) {
		int iFrom = Mathf.RoundToInt(from % 360);
		int iTarget = Mathf.RoundToInt(target % 360);
		
		float angle = Quaternion.Angle(Quaternion.Euler(0.0f, from, 0.0f), Quaternion.Euler(0.0f, target, 0.0f));
		int iAngle = Mathf.RoundToInt(angle);
		
		if (iTarget - iFrom == iAngle || (iTarget + 360) - iFrom == iAngle) {
			return angle;
		} else if (iFrom - iTarget == iAngle || (iFrom + 360) - iTarget == iAngle) {
			return -angle;
		} 

		print("nothing");
		return 0f;
	}

	public abstract void ExecuteEvent(Enum eventName);

}