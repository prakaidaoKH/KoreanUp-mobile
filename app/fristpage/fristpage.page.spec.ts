import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FristpagePage } from './fristpage.page';

describe('FristpagePage', () => {
  let component: FristpagePage;
  let fixture: ComponentFixture<FristpagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FristpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
