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

  deleteNote(value: number) {
    this.noteService.deleteNote(value);
    this.navCtrl.back();
  }
}
