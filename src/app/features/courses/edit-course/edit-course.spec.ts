import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoursesApi } from '../courses-api';
import { Router } from '@angular/router';
import { EditCourse } from './edit-course';

const routerStub = {
  getCurrentNavigation: () => ({
    extras: {
      state: {
        course: { id: '1', name: 'Math', code: 'M101', credits: 6 }
      }
    }
  })
};

describe('EditCourse', () => {
  let component: EditCourse;
  let fixture: ComponentFixture<EditCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourse, HttpClientTestingModule],
      providers: [CoursesApi, { provide: Router, useValue: routerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EditCourse);
    const comp = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
