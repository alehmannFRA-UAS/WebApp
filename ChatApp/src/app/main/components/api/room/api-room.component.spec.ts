import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRoomComponent } from './api-room.component';

describe('ApiRoomComponent', () => {
  let component: ApiRoomComponent;
  let fixture: ComponentFixture<ApiRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiRoomComponent]
    });
    fixture = TestBed.createComponent(ApiRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
