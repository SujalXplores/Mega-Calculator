import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuboidComponent } from './cuboid.component';

describe('CuboidComponent', () => {
  let component: CuboidComponent;
  let fixture: ComponentFixture<CuboidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuboidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuboidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
