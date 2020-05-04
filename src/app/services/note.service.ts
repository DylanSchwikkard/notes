import { Note } from "./../models/note.model";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  private notes: Note[] = [];
  private note: Note;
  constructor(public storage: Storage) {}

  saveNote(note: Note) {
    note.createDate = Date.now();
    this.notes.push(note);
    this.storage.set("notes", this.notes);
  }

  getAllNotes() {
    return this.storage.get("notes").then((notes) => {
      this.notes = notes == null ? [] : notes;
      return [...this.notes];
    });
  }

  getAllNotesFilter(s: string) {
    return this.storage.get("notes").then((notes) => {
      notes = notes.filter((note) => {
        if (note.category.replace(/\s/g, "").toLowerCase() == s) {
          return note;
        } else {
          return;
        }
      });
      this.notes = notes == null ? [] : notes;
      return [...this.notes];
    });
  }

  deleteNote(value: number) {
    this.notes = this.notes.filter((note) => {
      return note.createDate !== value;
    });
    this.storage.set("notes", this.notes);
  }

  getNote(cDate: number) {
    return this.storage.get("notes").then((notes) => {
      this.note = [...notes].find((r) => r.createDate === cDate);
      return this.note;
    });
  }
}
