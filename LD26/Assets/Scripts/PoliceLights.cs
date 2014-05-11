using UnityEngine;
using System.Collections;

public class PoliceLights : MonoBehaviour {

	[SerializeField]
	private float
		intensity;

	[SerializeField]
	private bool
		on;

	[SerializeField]
	private double
		rotateSpeed;
	
	private Component[]  lights;
	
	private int fadeTime;
	private float fadeSpeed;
	private float currentIntensity;

	// Use this for initialization
	void Start() {
		lights = gameObject.GetComponentsInChildren<Light>();
		
		foreach (Light l in lights) {
			if (on) {
				l.light.intensity = intensity;
			} else {
				l.light.intensity = 0;
			}
		}
	}
	
	// Update is called once per frame
	void Update() {
		if (fadeTime > 0) {
			int fTime = (int)(Time.deltaTime * 1000.0f);
			fadeTime -= fTime;
			if (fadeTime < 0) {
				// we overshot, rollback slightly
				fTime += fadeTime;
				fadeTime = 0;
			}
			
			if (on) {
				currentIntensity += (fadeSpeed * fTime);
			} else {
				currentIntensity -= (fadeSpeed * fTime);
			}
			
			// check if this is the last frame of fading; if so, set to target
			if (fadeTime == 0 && on) {
				currentIntensity = intensity;
			} else if (fadeTime == 0) {
				currentIntensity = 0.0f;
			}
			
			foreach (Light l in lights) {
				l.light.intensity = currentIntensity;
			}
		}
		
		if (on) {
			foreach (Light l in lights) {
				l.transform.eulerAngles.Set(l.transform.eulerAngles.x, l.transform.eulerAngles.y + (float)(rotateSpeed * (Time.deltaTime * 1000.0f)), l.transform.eulerAngles.z);
			}
		}
	}

	public void SwitchState(int timeToFade) {
		on = !on;
		fadeTime = timeToFade;
		fadeSpeed = intensity / timeToFade;
	}
}
