import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinningComponent } from './binning.component';

describe('BinningComponent', () => {
  let component: BinningComponent;
  let fixture: ComponentFixture<BinningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
