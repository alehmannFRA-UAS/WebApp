import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiChatComponent } from './api-chat.component';

describe('ApiChatComponent', () => {
  let component: ApiChatComponent;
  let fixture: ComponentFixture<ApiChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiChatComponent]
    });
    fixture = TestBed.createComponent(ApiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
