import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarModalComponent } from '../../modal/car-modal/car-modal.component';
import { PageHeaderModule } from '../../shared';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';

@NgModule({
    imports: [CommonModule, CarsRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule],
    declarations: [
        CarsComponent,
        CarModalComponent
    ]
})
export class CarsModule {}
