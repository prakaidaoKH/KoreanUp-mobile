import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamHistoryPage } from './exam-history.page';

describe('ExamHistoryPage', () => {
  let component: ExamHistoryPage;
  let fixture: ComponentFixture<ExamHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExamHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
