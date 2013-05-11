#pragma strict

///////////////////////
//  CONSTANT FIELDS  //
///////////////////////

static var speechSize : int;
static var titleSize : int;
static var terminalSize : int;

///////////////////////
//    INFO FIELDS    //
///////////////////////

static var gameTitle : String = "Morning (working title)";
static var osName : String = "MorNIX";
public static var protagonistName = "neo"; // change me!
static var antagonistName = "morpheus"; // change me!

///////////////////////



var fontSizeAt1080p : int;

private var screenWidth : int;
private var screenHeight : int;

private static var listeners : List.<ScreenSizeChangeListener>;


function Update () {
	UpdateFontSizes();
}

function UpdateFontSizes(){
	if(screenWidth != Screen.width || screenHeight != Screen.height){
		screenWidth = Screen.width;
		screenHeight = Screen.height;
		
		
		speechSize = (Screen.width / 1920.0) * fontSizeAt1080p;
		titleSize = (Screen.width / 1920.0) * fontSizeAt1080p * 2.0;
		terminalSize = (Screen.width / 1920.0) * fontSizeAt1080p * 0.8;
		print("updated font sizes to: speech=" + speechSize +"pt, title=" + titleSize + "pt, terminal=" + terminalSize);
		
		for(var l : ScreenSizeChangeListener in listeners){
			l.OnScreenSizeChanged();
		}
	}
}

static function RegisterScreenSizeChangeListnener(listener : ScreenSizeChangeListener){
	if(!listeners){
		listeners = List.<ScreenSizeChangeListener>();
	}
	
	listeners.Add(listener);
}