import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationV2Component } from './conversation-v2.component';

describe('ConversationComponent', () => {
  let component: ConversationV2Component;
  let fixture: ComponentFixture<ConversationV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationV2Component]
    });
    fixture = TestBed.createComponent(ConversationV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
