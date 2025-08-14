import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentsAPI } from './students-api';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Students } from './students';

describe('Students', () => {
  let component: Students;
  let fixture: ComponentFixture<Students>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Students, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      providers: [StudentsAPI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Students);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Students);
    const comp = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
