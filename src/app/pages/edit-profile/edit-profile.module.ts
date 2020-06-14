import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { AgmCoreModule } from "@agm/core";

import { EditProfilePage } from "./edit-profile.page";

const routes: Routes = [
    {
        path: "",
        component: EditProfilePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y"
        })
    ],
    declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
