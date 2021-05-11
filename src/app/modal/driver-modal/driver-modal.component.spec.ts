import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DriverModalComponent } from './driver-modal.component';

describe('DriverModalComponent', () => {
    let component: DriverModalComponent;
    let fixture: ComponentFixture<DriverModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgbModule],
            declarations: [DriverModalComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DriverModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
