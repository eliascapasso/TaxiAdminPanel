import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DriversComponent } from './drivers.component';
import { DriversModule } from './drivers.module';

describe('DriversComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DriversModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(DriversComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
