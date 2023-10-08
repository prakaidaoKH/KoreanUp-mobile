import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FineByUsernamePage } from './fine-by-username.page';

describe('FineByUsernamePage', () => {
  let component: FineByUsernamePage;
  let fixture: ComponentFixture<FineByUsernamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FineByUsernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
