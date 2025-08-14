import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ViewCourse } from './view-course';

const routerStub = {
  getCurrentNavigation: () => ({
    extras: {
      state: {
        course: { id: '1', name: 'Math', code: 'M101', credits: 6 }
      }
    }
  })
};

describe('ViewCourse', () => {
  let component: ViewCourse;
  let fixture: ComponentFixture<ViewCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCourse],
      providers: [{ provide: Router, useValue: routerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ViewCourse);
    const comp = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
