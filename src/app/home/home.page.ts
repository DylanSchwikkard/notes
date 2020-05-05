import { CategorydisplayService } from "./../services/categorydisplay.service";
import { SettingsService } from "./../services/settings.service";
import { DataService } from "./../services/data.service";
import { ViewNotePage } from "./../view-note/view-note.page";
import { Note } from "./../models/note.model";
import { NoteService } from "./../services/note.service";
import { AddNotePage } from "./../add-note/add-note.page";
import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { Settings } from "../models/settings.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  private notes: Promise<Note[]>;
  private note: Note;
  private settings: Settings;
  public urlId: string;
  private cat: string = "All";
  constructor(
    public navCtrl: NavController,
    private noteService: NoteService,
    private router: Router,
    private settingService: SettingsService,
    private activatedRoute: ActivatedRoute,
    private catService: CategorydisplayService
  ) {}

  ionViewWillEnter() {
    this.urlId = this.activatedRoute.snapshot.paramMap.get("id");
    this.cat = this.urlId;
    this.getCurrentCategory();
    this.initSettings();
    if (this.urlId == null) {
      this.notes = this.getAllNotes();
    } else {
      this.notes = this.noteService.getAllNotesFilter(this.urlId);
    }
  }

  ngOnInit() {}

  setDiv(s: string) {}

  async getCurrentCategory() {
    let s = await this.catService.getCurrCategory();
    setTimeout(function () {
      document.getElementById("typeNote").innerText = s;
    }, 100);
  }

  getDate(date) {
    let d = new Date(date);

    return d.toLocaleDateString();
  }

  async initSettings() {
    this.settings = await this.settingService.initSettings();
    let x = <HTMLCollectionOf<HTMLElement>>(
      document.getElementsByClassName("category")
    );
    if (this.settings.categoryOn == false) {
      x[0].style.visibility = "hidden";
    } else {
      x[0].style.visibility = "visible";
    }
  }

  addNote() {
    this.navCtrl.navigateForward("/addnote");
  }

  async getNote(createDate: number) {
    // this.navCtrl.navigateForward("/view-note/" + createDate);
    this.noteService.getNote(createDate).then((n) => {
      this.note = n;
      let navigationExtras: NavigationExtras = {
        state: {
          note: this.note,
        },
      };
      this.router.navigate(["view-note"], navigationExtras);
    });
  }

  getAllNotes() {
    return this.noteService.getAllNotes();
  }
}
