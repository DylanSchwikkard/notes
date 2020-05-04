import { Router } from "@angular/router";
import { SettingsService } from "./services/settings.service";
import { Settings } from "./models/settings.model";
import { Category } from "./models/category.model";
import { CategorydisplayService } from "./services/categorydisplay.service";
import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public selectedIndex = 0;
  categories: Category[] = [];
  settings: Settings;

  public appPages = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private catService: CategorydisplayService,
    private settingService: SettingsService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async getCategories() {
    this.categories = await this.catService.getCategories();
  }

  async initSettings() {
    this.settings = await this.settingService.initSettings();
    let x = <HTMLCollectionOf<HTMLElement>>(
      document.getElementsByClassName("category")
    );
    if (this.settings.categoryOn == false) {
      console.log(x.length);
      x[0].style.visibility = "hidden";
    } else {
      x[0].style.visibility = "visible";
    }
  }

  setCategory(s) {
    this.catService.setCurrCategory(s);
  }

  getCategory() {
    this.catService.getCurrCategory().then((c) => {
      if (c == "All") {
        console.log("Ever work?");
      } else {
        this.router.navigate(["home/" + c.replace(/\s/g, "").toLowerCase()]);
      }
    });
  }

  ngOnInit() {
    this.getCategory();
    this.initSettings();
    this.getCategories();
    this.catService.getCategories().then((cat) => {
      if (cat.length == 0) {
        let type: string = "All";
        let url: string = "/all";
        let id: number = cat.length;
        let icon: string = "wallpaper";
        let tmp: Category = { type, url, icon, id };
        this.catService.addCategory(tmp);
        this.getCategories();
      }
    });

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
}
