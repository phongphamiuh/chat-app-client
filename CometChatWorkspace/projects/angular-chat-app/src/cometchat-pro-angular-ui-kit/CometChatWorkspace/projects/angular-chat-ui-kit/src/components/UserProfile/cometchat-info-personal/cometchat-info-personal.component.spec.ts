import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatInfoPersonalComponent } from './cometchat-info-personal.component';

describe('CometchatInfoPersonalComponent', () => {
  let component: CometchatInfoPersonalComponent;
  let fixture: ComponentFixture<CometchatInfoPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatInfoPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
