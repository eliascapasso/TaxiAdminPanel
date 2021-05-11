import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverModalComponent } from '../../modal/driver-modal/driver-modal.component';
import { PageHeaderModule } from '../../shared';

import { DriversRoutingModule } from './drivers-routing.module';
import { DriversComponent } from './drivers.component';

@NgModule({
    imports: [CommonModule, DriversRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule],
    declarations: [
        DriversComponent,
        DriverModalComponent
    ]
})
export class DriversModule {}
