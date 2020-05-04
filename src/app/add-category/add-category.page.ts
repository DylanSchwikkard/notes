import { Router } from "@angular/router";
import { Category } from "./../models/category.model";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CategorydisplayService } from "./../services/categorydisplay.service";
import { NavController, AlertController } from "@ionic/angular";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Settings } from "../models/settings.model";
import { SettingsService } from "../services/settings.service";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.page.html",
  styleUrls: ["./add-category.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddCategoryPage implements OnInit {
  settings: Settings;
  formGroup: FormGroup;
  type: string;
  url: string;
  icon: string;
  iconList: string[] = [];

  constructor(
    private settingService: SettingsService,
    public navCtrl: NavController,
    private catService: CategorydisplayService,
    public alertController: AlertController,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      type: new FormControl(),
      url: new FormControl(),
      icon: new FormControl(),
    });
    this.iconList[0] = "alarm";
    this.iconList[1] = "home";
    this.iconList[2] = "change_history";
    this.iconList[3] = "announcement";
    this.iconList[4] = "done";
    this.iconList[5] = "airplanemode_active";
    this.iconList[6] = "create";
    this.iconList[7] = "work";
    this.iconList[8] = "shopping_cart";
    this.iconList[9] = "subject";
  }

  ngOnInit() {
    this.initSettings();
  }

  async initSettings() {
    this.settings = await this.settingService.initSettings();
  }

  goBack() {
    this.navCtrl.back();
  }

  addCat(value) {
    if (value.type.length == 0 || value.type.length > 30) {
      this.presentAlert(
        "Error",
        "Please enter a name for your category of a length between 0 - 30 characters"
      );
      this.formGroup.controls["type"].reset();
    } else if (value.icon == "") {
      this.presentAlert("Error", "Please select an icon");
    } else {
      let catAdd: Category = {
        type: value.type + "",
        url: "/" + value.type.replace(/\s/g, "").toLowerCase(),
        icon: value.icon.trim(),
      };

      this.addCatFR(catAdd);
    }
  }

  addCatFR(c: Category) {
    this.catService.addCategory(c).then(() => {
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    });
  }

  showURL() {
    console.log("HI");
  }
  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async reload() {
    await location.reload();
    this.navCtrl.back();
  }

  doThis() {
    setTimeout(function () {
      let y = document.getElementsByClassName("alert-radio-label");

      for (var i = 0; i < y.length; i++) {
        y[i].classList.add("material-icons");
        y[i].classList.add("center-align");
      }
    }, 50);
  }
}
