// import {
//   JsonObject,
//   JsonProperty,
//   JsonSerializer,
// } from "typescript-json-serializer";

import { callable } from "@decky/api";

//const SETTINGS_KEY = "DeckyWindowsTools";
//const serializer = new JsonSerializer();

const set_volume = callable<[number], void>('set_volume');
const set_brightness = callable<[number], void>('set_brightness');

//@JsonObject()
export class SystemSetting {
  //@JsonProperty()
  public volume: number;

  //@JsonProperty()
  public brightness: number;

  constructor() {
    this.volume = 20;
    this.brightness = 50;
  }

  deepCopy(copyTarget: SystemSetting) {
    // this.overwrite=copyTarget.overwrite;
    this.volume = copyTarget.volume;
    this.brightness = copyTarget.brightness;
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
      set_volume(volume);
      // Settings.saveSettingsToLocalStorage();
    }
  }

  static getVolume() {
    return this.instance.system.volume;
  }

  static setBrightness(brightness: number) {
    if (this.instance.system.brightness != brightness) {
      this.instance.system.brightness = brightness;
      set_brightness(brightness);
      // Settings.saveSettingsToLocalStorage();
    }
  }

  static getBrightness() {
    return this.instance.system.brightness;
  }
}
