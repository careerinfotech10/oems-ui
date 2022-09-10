import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDateQuizComponent } from './up-date-quiz.component';

describe('UpDateQuizComponent', () => {
  let component: UpDateQuizComponent;
  let fixture: ComponentFixture<UpDateQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpDateQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpDateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
