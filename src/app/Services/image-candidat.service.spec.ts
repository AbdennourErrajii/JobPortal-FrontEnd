import { TestBed } from '@angular/core/testing';

import { ImageCandidatService } from './image-candidat.service';

describe('ImageCandidatService', () => {
  let service: ImageCandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
