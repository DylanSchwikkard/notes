import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AddNotePage } from "./add-note/add-note.page";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "home/all",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home/:id",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },

  {
    path: "addnote",
    loadChildren: () =>
      import("./add-note/add-note.module").then((m) => m.AddNotePageModule),
  },
  {
    path: "view-note",
    loadChildren: () =>
      import("./view-note/view-note.module").then((m) => m.ViewNotePageModule),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule),
  },
  {
    path: "add-category",
    loadChildren: () =>
      import("./add-category/add-category.module").then(
        (m) => m.AddCategoryPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
