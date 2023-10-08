import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowScorePage } from './show-score.page';

describe('ShowScorePage', () => {
  let component: ShowScorePage;
  let fixture: ComponentFixture<ShowScorePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowScorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
