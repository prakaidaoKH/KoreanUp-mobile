import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendSlipPage } from './send-slip.page';

describe('SendSlipPage', () => {
  let component: SendSlipPage;
  let fixture: ComponentFixture<SendSlipPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SendSlipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
