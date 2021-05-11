import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { 
                path: 'drivers', loadChildren: () => import('./drivers/drivers.module').then((m) => m.DriversModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'drivers-map', loadChildren: () => import('./map-driver/map-driver.module').then((m) => m.MapDriverModule),
                canActivate: [AuthGuard]  
            },
            { 
                path: 'cars', loadChildren: () => import('./cars/cars.module').then((m) => m.CarsModule),
                canActivate: [AuthGuard] 
            },
            {
                path: 'passengers',
                loadChildren: () => import('./passengers/passengers.module').then((m) => m.PassengersModule),
                canActivate: [AuthGuard] 
            },
            { 
                path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
                canActivate: [AuthGuard] 
            },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule),
                canActivate: [AuthGuard] 
            },
            { 
                path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule),
                canActivate: [AuthGuard] 
            },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule),
                canActivate: [AuthGuard] 
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
