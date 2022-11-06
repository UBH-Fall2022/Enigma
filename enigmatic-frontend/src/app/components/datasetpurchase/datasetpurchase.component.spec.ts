import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetpurchaseComponent } from './datasetpurchase.component';

describe('DatasetpurchaseComponent', () => {
  let component: DatasetpurchaseComponent;
  let fixture: ComponentFixture<DatasetpurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetpurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
