using UnityEngine;
using System.Collections;
using System;

public class ApartmentScriptEvents : ScriptEvents {
	
	public enum ApartmentScriptEventNames {
		WAKE_UP,
		POLICE_ARRIVE
	}

	private class PoliceSwitchState : ScriptFunction {

		private int fadeTime;

		public PoliceSwitchState(int fadeTime) {
			this.fadeTime = fadeTime;
		}

		public override void Execute() {
			policeLights.SwitchState(fadeTime);
		}
	}

	private bool police = false;
	private static PoliceLights policeLights;

	public override void ExecuteEvent(Enum eventName) {
		if (eventName is ApartmentScriptEventNames) { // FIXME will this ever be true?
			switch ((ApartmentScriptEventNames)eventName) {
				case ApartmentScriptEventNames.WAKE_UP:
					WakeUp();
					//QuickStart();
					break;
				case ApartmentScriptEventNames.POLICE_ARRIVE:
					PoliceArrive();
					break;
			}
		}
	}

	private void WakeUp() {

	}

	private void QuickStart() {

	}

	private void PoliceArrive() {

	}


}
