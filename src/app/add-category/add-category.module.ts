import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { IonicModule } from "@ionic/angular";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddCategoryPageRoutingModule } from "./add-category-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { AddCategoryPage } from "./add-category.page";
import { MatOptionModule } from "@angular/material/core";

@NgModule({
  imports: [
    MatSelectModule,
    MatIconModule,
    MatOptionModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCategoryPageRoutingModule,
  ],
  declarations: [AddCategoryPage],
})
export class AddCategoryPageModule {}
