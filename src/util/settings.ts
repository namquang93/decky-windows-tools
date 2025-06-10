// import {
//   JsonObject,
//   JsonProperty,
//   JsonSerializer,
// } from "typescript-json-serializer";

//const SETTINGS_KEY = "DeckyWindowsTools";
//const serializer = new JsonSerializer();

//@JsonObject()
export class SystemSetting {
  //@JsonProperty()
  public volume: number;

  constructor() {
    this.volume = 20;
  }

  deepCopy(copyTarget: SystemSetting) {
    // this.overwrite=copyTarget.overwrite;
    this.volume = copyTarget.volume;
  }
}

export class Settings {
  private static _instance: Settings = new Settings();

  public system: SystemSetting;

  constructor() {
    this.system = new SystemSetting();
  }

  static get instance(): Settings {
    if (!this._instance) {
      console.log("Creating new Settings instance");
      this._instance = new Settings();
    }
    
    return this._instance;
  }

  // private settingChangeEvent = new EventTarget();

  static setVolume(volume: number) {
    if (this.instance.system.volume != volume) {
      this.instance.system.volume = volume;
      // Settings.saveSettingsToLocalStorage();
    }
  }

  static getVolume() {
    return this.instance.system.volume;
  }
}
