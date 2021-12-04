import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestFriendsComponent } from './list-request-friends.component';

describe('ListRequestFriendsComponent', () => {
  let component: ListRequestFriendsComponent;
  let fixture: ComponentFixture<ListRequestFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRequestFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequestFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
