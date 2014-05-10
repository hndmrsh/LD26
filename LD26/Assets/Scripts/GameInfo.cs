using UnityEngine;
using System.Collections.Generic;

public class GameInfo : MonoBehaviour {

	///////////////////////
	//  CONSTANT FIELDS  //
	///////////////////////
	
	private int speechSize;
	private int titleSize;
	private int terminalSize;
	
	///////////////////////
	//    INFO FIELDS    //
	///////////////////////
	
	public static string gameTitle = "Morning (working title)";
	public static string osName = "MorNIX";

	public static string protagonistName = "neo"; // change me!
	public static string antagonistName = "morpheus"; // change me!
	
	///////////////////////

	[SerializeField]
	private int
		fontSizeAt1080p;
	
	private int screenWidth;
	private int screenHeight;
	
	private static List<ScreenSizeChangeListener> listeners;
	
	void UpdateFontSizes() {
		speechSize = (int)((Screen.width / 1920.0) * fontSizeAt1080p);
		titleSize = (int)((Screen.width / 1920.0) * fontSizeAt1080p * 2.0);
		terminalSize = (int)((Screen.width / 1920.0) * fontSizeAt1080p * 0.8);
		print("updated font sizes to: speech=" + speechSize + "pt, title=" + titleSize + "pt, terminal=" + terminalSize);
			
		foreach (ScreenSizeChangeListener l in listeners) {
			l.OnScreenSizeChanged();
		}
	}
	
	static void RegisterScreenSizeChangeListnener(ScreenSizeChangeListener listener) {
		if (listeners == null) {
			listeners = new List<ScreenSizeChangeListener>();
		}
		
		listeners.Add(listener);
	}

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
}
