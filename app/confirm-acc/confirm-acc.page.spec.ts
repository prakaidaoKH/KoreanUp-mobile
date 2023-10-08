import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmAccPage } from './confirm-acc.page';

describe('ConfirmAccPage', () => {
  let component: ConfirmAccPage;
  let fixture: ComponentFixture<ConfirmAccPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmAccPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
