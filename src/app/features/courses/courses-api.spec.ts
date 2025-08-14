import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CoursesApi } from './courses-api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../../../shared/entities';
import { RoutePaths } from '../../../shared/routes';

describe('CoursesApi', () => {
  let service: CoursesApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesApi],
    });
    service = TestBed.inject(CoursesApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET courses', fakeAsync(() => {
    const mock: Course[] = [
      { id: '1', name: 'Math', code: 'M101', credits: 6 },
      { id: '2', name: 'Physics', code: 'P201', credits: 5 },
    ];
    let res: Course[] | undefined;

    service.getCourses().subscribe(r => (res = r));

    const req = httpMock.expectOne(`${service.baseUrl}/${RoutePaths.COURSES}`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    tick(1000); // si en tu servicio usas delay(1000)

    expect(res?.length).toBe(2);
    expect(res?.[0].name).toBe('Math');
  }));
});
