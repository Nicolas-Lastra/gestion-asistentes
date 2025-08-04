import { TestBed } from '@angular/core/testing';

import { StudentsAPI } from './students-api';

describe('StudentsAPI', () => {
  let service: StudentsAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
