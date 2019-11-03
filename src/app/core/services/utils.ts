import {Observable} from 'rxjs';

export function observableResultByTimeout<T = any>(result: T, delay: number): Observable<T> {
  return new Observable<T>(subscriber => {
    setTimeout(() => {
      subscriber.next(result);
      subscriber.complete();
    }, delay);
  });
}

export function JSONSP(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
