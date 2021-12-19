import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatDeleteMessageNoUserComponent } from './comet-chat-delete-message-no-user.component';

describe('CometChatDeleteMessageNoUserComponent', () => {
  let component: CometChatDeleteMessageNoUserComponent;
  let fixture: ComponentFixture<CometChatDeleteMessageNoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatDeleteMessageNoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatDeleteMessageNoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
