import { Category } from "./../models/category.model";
import { CategorydisplayService } from "./../services/categorydisplay.service";
import { Note } from "./../models/note.model";
import { NoteService } from "./../services/note.service";
import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-add-note",
  templateUrl: "./add-note.page.html",
  styleUrls: ["./add-note.page.scss"],
})
export class AddNotePage implements OnInit {
  formGroup: FormGroup;
  note: Note;
  date: Date = new Date();
  title: string = "";
  content: string = "";
  category: string = "";
  categories: Category[];

  constructor(
    public navCtrl: NavController,
    private noteService: NoteService,
    private catService: CategorydisplayService
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      date: new FormControl(),
      category: new FormControl(),
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.catService.getCategories();
    console.log(this.categories);
  }
  saveNote(value: Note) {
    this.noteService.saveNote(value);
    this.navCtrl.back();
  }

  goBack() {
    this.navCtrl.back();
  }
}
