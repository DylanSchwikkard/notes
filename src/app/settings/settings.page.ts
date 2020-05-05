import { CategorydisplayService } from "./../services/categorydisplay.service";
import { SettingsService } from "./../services/settings.service";
import { NavController, AlertController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { Settings } from "../models/settings.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  lightMode: boolean = false;
  categories: boolean = false;
  private change: boolean = false;
  constructor(
    public navCtrl: NavController,
    private settingService: SettingsService,
    private catService: CategorydisplayService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async initSettings() {
    let settings = await this.settingService.initSettings();

    if (settings.categoryOn == false) {
      this.categories = false;
    } else {
      this.categories = true;
    }
  }

  ionViewWillEnter() {
    this.change = false;
  }

  ngOnInit() {
    this.initSettings();
    let x = <HTMLCollectionOf<HTMLElement>>(
      document.getElementsByClassName("category")
    );
    this.change = false;
  }

  async present(h: string, m: string) {
    const alert = await this.alertController.create({
      header: h,

      message: m,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async deleteCat() {
    let curr = await this.catService.getCurrCategory();
    if (curr.trim() == "All") {
      this.present("Error", "Cannot delete " + curr);
    } else {
      this.catService.deleteCat(curr);
      this.catService.setCurrCategory("All");

      this.present(curr, "Was Deleted");
    }
  }
  categoriesChange($event) {
    this.change = true;
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
    if (this.change == false) {
      this.navCtrl.back();
    } else {
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    }
  }
}
