import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodeQuizComponent } from './lode-quiz.component';

describe('LodeQuizComponent', () => {
  let component: LodeQuizComponent;
  let fixture: ComponentFixture<LodeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LodeQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LodeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
