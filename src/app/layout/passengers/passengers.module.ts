import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassengerModalComponent } from '../../modal/passenger-modal/passenger-modal.component';

import { PassengersRoutingModule } from './passengers-routing.module';
import { PassengersComponent } from './passengers.component';

@NgModule({
    imports: [CommonModule, PassengersRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule],
    declarations: [
        PassengersComponent,
        PassengerModalComponent
    ]
})
export class PassengersModule {}
