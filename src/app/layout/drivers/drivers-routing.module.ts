import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DriversComponent } from './drivers.component';

const routes: Routes = [
    {
        path: '',
        component: DriversComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
    exports: [RouterModule]
})
export class DriversRoutingModule {}
