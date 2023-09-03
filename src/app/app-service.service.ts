import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  username$ = new BehaviorSubject<string>('')
  password$ = new BehaviorSubject<string>('')

  constructor() { }
}
