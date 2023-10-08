import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreApplyPage } from './pre-apply.page';

describe('PreApplyPage', () => {
  let component: PreApplyPage;
  let fixture: ComponentFixture<PreApplyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreApplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
