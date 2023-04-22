import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state = new BehaviorSubject<IState>(initial_state);



  constructor() { }
}

export interface IState{
  _id: string,
  name: string,
  email: string,
  jwt: string
}

export const initial_state = { _id: '', name: 'Guest', email: '', jwt: ''}