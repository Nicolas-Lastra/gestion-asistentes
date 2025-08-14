import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ViewStudent } from './view-student';

const routerStub = {
  getCurrentNavigation: () => ({
    extras: {
      state: {
        student: { id: '1', name: 'John', surname: 'Doe', dni: '12345678', email: 'john@example.com' }
      }
    }
  })
};

describe('ViewStudent', () => {
  let component: ViewStudent;
  let fixture: ComponentFixture<ViewStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudent],
      providers: [{ provide: Router, useValue: routerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ViewStudent);
    const comp = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
