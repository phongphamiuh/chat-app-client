import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddFriendsComponent } from './user-add-friends.component';

describe('UserAddFriendsComponent', () => {
  let component: UserAddFriendsComponent;
  let fixture: ComponentFixture<UserAddFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
