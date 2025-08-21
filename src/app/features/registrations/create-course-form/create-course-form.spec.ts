import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseForm } from './create-course-form';

describe('CreateCourseForm', () => {
  let component: CreateCourseForm;
  let fixture: ComponentFixture<CreateCourseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCourseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
