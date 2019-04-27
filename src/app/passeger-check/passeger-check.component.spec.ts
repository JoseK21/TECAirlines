import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassegerCheckComponent } from './passeger-check.component';

describe('PassegerCheckComponent', () => {
  let component: PassegerCheckComponent;
  let fixture: ComponentFixture<PassegerCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassegerCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassegerCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
