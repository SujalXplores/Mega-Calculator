import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiSquareTestComponent } from './chi-square-test.component';

describe('ChiSquareTestComponent', () => {
  let component: ChiSquareTestComponent;
  let fixture: ComponentFixture<ChiSquareTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiSquareTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiSquareTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
