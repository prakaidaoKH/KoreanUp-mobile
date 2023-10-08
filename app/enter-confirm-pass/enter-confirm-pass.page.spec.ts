import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterConfirmPassPage } from './enter-confirm-pass.page';

describe('EnterConfirmPassPage', () => {
  let component: EnterConfirmPassPage;
  let fixture: ComponentFixture<EnterConfirmPassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnterConfirmPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
