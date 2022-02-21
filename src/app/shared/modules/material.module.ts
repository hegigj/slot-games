import {NgModule} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  exports: [
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
