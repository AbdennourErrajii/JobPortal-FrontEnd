import { TestBed } from '@angular/core/testing';

import { CvCandidatService } from './cv-candidat.service';

describe('CvCandidatService', () => {
  let service: CvCandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvCandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
