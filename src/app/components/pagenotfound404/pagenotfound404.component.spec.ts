import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagenotfound404Component } from './pagenotfound404.component';

describe('Pagenotfound404Component', () => {
  let component: Pagenotfound404Component;
  let fixture: ComponentFixture<Pagenotfound404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pagenotfound404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pagenotfound404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
