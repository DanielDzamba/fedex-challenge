import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('Loader Service', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });

    service = TestBed.inject(LoaderService);
  });

  it('addLoadingEvent method should return appropriately update loader buffer status', () => {
    service.addLoadingEvent();

    expect(service.isLoaderShown()).toEqual(true);
  });

  it('removeLoadingEvent method should appropriately update loader buffer status', () => {
    service.addLoadingEvent();
    service.removeLoadingEvent();

    expect(service.isLoaderShown()).toEqual(false);
  });
});
