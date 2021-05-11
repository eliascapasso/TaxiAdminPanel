import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengersComponent } from './passengers.component';

const routes: Routes = [
    {
        path: '',
        component: PassengersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PassengersRoutingModule {}
