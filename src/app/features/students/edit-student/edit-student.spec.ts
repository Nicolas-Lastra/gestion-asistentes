import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentsAPI } from '../students-api';
import { Router } from '@angular/router';
import { EditStudent } from './edit-student';

const routerStub = {
  getCurrentNavigation: () => ({
    extras: {
      state: {
        student: { id: '1', name: 'John', surname: 'Doe', dni: '12345678', email: 'john@example.com' }
      }
    }
  })
};

describe('EditStudent', () => {
  let component: EditStudent;
  let fixture: ComponentFixture<EditStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStudent, HttpClientTestingModule],
      providers: [StudentsAPI, { provide: Router, useValue: routerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EditStudent);
    const comp = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
