import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared';

import { MapRoutingModule } from './map-driver-routing.module';
import { MapDriverComponent } from './map-driver.component';

@NgModule({
    imports: [CommonModule, MapRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, NgbTypeaheadModule],
    declarations: [
        MapDriverComponent
    ]
})
export class MapDriverModule {}
