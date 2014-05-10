using UnityEngine;
using System.Collections;

public class HalogenLight : MonoBehaviour {

	[SerializeField]
	private float
		intensity;

	[SerializeField]
	private float
		flickerIntensity;

	[SerializeField]
	private bool
		flicker;

	[SerializeField]
	private bool
		on;
	
	
	private int timeToNextFlick = 0;
	private int flickTime = 0;

	// Use this for initialization
	void Start() {
		if (on) {
			light.intensity = intensity;
		} else {
			light.intensity = 0;
		}
	}
	
	// Update is called once per frame
	void Update() {
		if (on && flicker) {
			if (flickTime == 0) {
				light.intensity = intensity;
				// time to next flick
				timeToNextFlick = (int)Mathf.Pow(Random.Range(12, 20), 1.8f);
			}
			
			if (flickTime >= timeToNextFlick) {
				light.intensity = flickerIntensity;
				flickTime = (int)-Mathf.Sqrt(Random.Range(25, 1000));
			} else {
				flickTime++;
			}
		}
	}

	public void SwitchState() {
		on = !on;
		if (!on) {
			light.intensity = 0;
		} else {
			light.intensity = intensity;
		}
	}
}
