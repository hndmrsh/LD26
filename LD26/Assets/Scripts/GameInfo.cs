using UnityEngine;
using System.Collections.Generic;

public class GameInfo : MonoBehaviour {

	public const string GAME_TITLE = "Morning (working title)";
	public const string OS_NAME = "MorNIX";
	public const string PROTAGONIST_NAME = "neo"; // change me!
	public const string ANTAGONIST_NAME = "morpheus"; // change me!

	public static int SpeechSize { get; set; }
	public static int TitleSize { get; set; }
	private static int terminalSize;
	
	[SerializeField]
	private int
		fontSizeAt1080p;

	private int screenWidth;
	private int screenHeight;
	private static List<ScreenSizeChangeListener> listeners;
	
	// Update is called once per frame
	void Update() {
		if (screenWidth != Screen.width || screenHeight != Screen.height) {
			screenWidth = Screen.width;
			screenHeight = Screen.height;

			UpdateFontSizes();
		}

		if (true) {
			print("test");
		}
	}

	private void UpdateFontSizes() {
		SpeechSize = (int)((Screen.width / 1920.0) * fontSizeAt1080p);
		TitleSize = (int)((Screen.width / 1920.0) * fontSizeAt1080p * 2.0);
		terminalSize = (int)((Screen.width / 1920.0) * fontSizeAt1080p * 0.8);
		print("updated font sizes to: speech=" + SpeechSize + "pt, title=" + TitleSize + "pt, terminal=" + terminalSize);
		
		foreach (ScreenSizeChangeListener l in listeners) {
			l.OnScreenSizeChanged();
		}
	}
	
	public static void RegisterScreenSizeChangeListnener(ScreenSizeChangeListener listener) {
		if (listeners == null) {
			listeners = new List<ScreenSizeChangeListener>();
		}
		
		listeners.Add(listener);
	}
}
