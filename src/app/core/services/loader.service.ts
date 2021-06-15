import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  private loaderEventsBuffer: boolean[] = []; // if empty buffer loader is not shown

  private _loaderShown$ = new BehaviorSubject<boolean>(false);
  get loaderShown$() {
    return this._loaderShown$.asObservable();
  }

  addLoadingEvent() {
    this.loaderEventsBuffer.push(true);
    this._loaderShown$.next(true);
  }

  removeLoadingEvent() {
    if (this.loaderEventsBuffer && this.loaderEventsBuffer.length > 0) {
      this.loaderEventsBuffer.shift();
    }
    this._loaderShown$.next(this.isLoaderShown());
  }

  isLoaderShown(): boolean {
    return this.loaderEventsBuffer && this.loaderEventsBuffer.length > 0
      ? true
      : false;
  }
}
