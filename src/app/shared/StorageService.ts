import { BehaviorSubject, Observable } from 'rxjs';


export class StorageService<T> {

  protected storedValue$: BehaviorSubject<T>;

  protected constructor(private readonly defaultValue: T) {
    this.storedValue$ = new BehaviorSubject<T>(defaultValue);
  }

  set(newValue: T): void {
    this.storedValue$.next(newValue);
  }

  get(): T {
    return this.storedValue$.getValue();
  }

  select(): Observable<T> {
    return this.storedValue$.asObservable();
  }
}
