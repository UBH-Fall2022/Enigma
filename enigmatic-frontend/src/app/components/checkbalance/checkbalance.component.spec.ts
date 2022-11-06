import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbalanceComponent } from './checkbalance.component';

describe('CheckbalanceComponent', () => {
  let component: CheckbalanceComponent;
  let fixture: ComponentFixture<CheckbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckbalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
