import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsReservationComponent } from './flights-reservation.component';

describe('FlightsReservationComponent', () => {
  let component: FlightsReservationComponent;
  let fixture: ComponentFixture<FlightsReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
