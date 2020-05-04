import { Settings } from "./../models/settings.model";
import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private settings = { categoryOn: false, lightModeOn: false } as Settings;
  constructor(private storage: Storage) {}

  doChange(s: Settings) {
    this.settings = s;
    this.storage.set("settings", this.settings);
  }

  initSettings(): Promise<Settings> {
    return this.storage.get("settings").then((sett) => {
      if (sett == null) {
        this.doChange(this.settings);
      } else {
        this.settings = sett;
      }
      return this.settings;
    });
  }
}
