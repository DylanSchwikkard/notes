import { Note } from "./../models/note.model";
import { NavController, NavParams } from "@ionic/angular";
import { NoteService } from "./../services/note.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-note",
  templateUrl: "./view-note.page.html",
  styleUrls: ["./view-note.page.scss"],
})
export class ViewNotePage implements OnInit {
  note: Note;
  constructor(
    private noteService: NoteService,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.note = this.router.getCurrentNavigation().extras.state.note;
      }
    });
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  getDate(date) {
    let d = new Date(date);

    return d.toLocaleDateString();
  }

  deleteNote(value: number) {
    this.noteService.deleteNote(value);
    this.navCtrl.back();
  }

  saveNote(num: number) {
    let newContent = document.querySelector("textarea").innerHTML;
    let newTitle = document.querySelector("input").value;
    if (newContent == this.note.content && newTitle == this.note.title) {
      this.navCtrl.back();
    } else {
      let n = {
        title: newTitle,
        content: newContent,
        date: this.note.date,
        createDate: this.note.createDate,
        category: this.note.category,
      } as Note;
      this.noteService.updateNote(n).then(() => {
        this.navCtrl.back();
      });
    }
  }
}
