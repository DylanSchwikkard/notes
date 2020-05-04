import { SettingsService } from "./../services/settings.service";
import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { Settings } from "../models/settings.model";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  lightMode: boolean = false;
  categories: boolean = false;
  constructor(
    public navCtrl: NavController,
    private settingService: SettingsService
  ) {}

  async initSettings() {
    let settings = await this.settingService.initSettings();

    if (settings.categoryOn == false) {
      this.categories = false;
    } else {
      this.categories = true;
    }
  }

  ngOnInit() {
    this.initSettings();
    let x = <HTMLCollectionOf<HTMLElement>>(
      document.getElementsByClassName("category")
    );
  }

  categoriesChange($event) {
    let set: Settings = {
      categoryOn: this.categories,
      lightModeOn: this.lightMode,
    };
    this.settingService.doChange(set);
  }

  themeChange($event) {
    let set: Settings = {
      categoryOn: this.categories,
      lightModeOn: this.lightMode,
    };
    this.settingService.doChange(set);
  }

  goBack() {
    this.navCtrl.back();
  }
}
