import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class CategorydisplayService {
  private categories: Category[] = [];
  private category: string;
  constructor(public storage: Storage) {}

  getCategories() {
    return this.storage.get("categories").then((notes) => {
      this.categories = notes == null ? [] : notes;
      return [...this.categories];
    });
  }

  addCategory(cat: Category) {
    this.categories.push(cat);
    return this.storage.set("categories", this.categories);
  }

  setCurrCategory(s: string) {
    this.category = s;
    return this.storage.set("category", s);
  }

  getCurrCategory() {
    return this.storage.get("category").then((c) => {
      this.category = c == null ? "" : c;

      return this.category;
    });
  }

  deleteCat(n: string) {
    this.categories = this.categories.filter((note) => {
      return note.type !== n;
    });
    this.storage.set("categories", this.categories);
  }
}
