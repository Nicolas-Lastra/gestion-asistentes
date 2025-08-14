import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StudentsAPI } from './students-api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Student } from '../../../shared/entities';
import { RoutePaths } from '../../../shared/routes';

describe('StudentsAPI', () => {
  let service: StudentsAPI;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsAPI],
    });

    service = TestBed.inject(StudentsAPI);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET students list', fakeAsync(() => {

    // Setup

    const mockStudents: Student[] = [
      { id: '1', name: 'John', surname: 'Doe', dni: '12345678', email: 'john@example.com' },
      { id: '2', name: 'Jane', surname: 'Smith', dni: '87654321', email: 'jane@example.com' },
    ];

    let result: Student[] | undefined;

    // Act
    service.getStudents().subscribe(res => (result = res));
    
    const req = httpMock.expectOne(`${service.baseUrl}/${RoutePaths.STUDENTS}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents);

    tick(1000);

    // Assert
    expect(result).toBeTruthy();
    expect(result!.length).toBe(2);
    expect(result![0].name).toBe('John');
    expect(result![1].email).toBe('jane@example.com');
  }));

});
