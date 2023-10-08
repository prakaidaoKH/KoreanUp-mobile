import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnOnePage } from './learn-one.page';

describe('LearnOnePage', () => {
  let component: LearnOnePage;
  let fixture: ComponentFixture<LearnOnePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LearnOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
