import { TestBed } from '@angular/core/testing';

import { CoursesApi } from './courses-api';

describe('CoursesApi', () => {
  let service: CoursesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
