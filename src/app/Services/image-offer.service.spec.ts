import { TestBed } from '@angular/core/testing';

import { ImageOfferService } from './image-offer.service';

describe('ImageOfferService', () => {
  let service: ImageOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
