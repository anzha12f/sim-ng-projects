import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proj01Component } from './proj01.component';

describe('Proj01Component', () => {
  let component: Proj01Component;
  let fixture: ComponentFixture<Proj01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proj01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proj01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
