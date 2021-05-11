import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDriverComponent } from './map-driver.component';

describe('MapDriverComponent', () => {
  let component: MapDriverComponent;
  let fixture: ComponentFixture<MapDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
