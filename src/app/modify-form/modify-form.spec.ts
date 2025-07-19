import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyForm } from './modify-form';

describe('ModifyForm', () => {
  let component: ModifyForm;
  let fixture: ComponentFixture<ModifyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
