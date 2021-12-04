import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMemberRequestFriendsComponent } from './list-member-request-friends.component';

describe('ListMemberRequestFriendsComponent', () => {
  let component: ListMemberRequestFriendsComponent;
  let fixture: ComponentFixture<ListMemberRequestFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMemberRequestFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMemberRequestFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
