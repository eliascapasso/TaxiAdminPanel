import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MapDriverComponent } from './map-driver.component';

const routes: Routes = [
    {
        path: '',
        component: MapDriverComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
    exports: [RouterModule]
})
export class MapRoutingModule {}
