import type { Action } from 'redux';
import { User } from './index';

export interface AppActions extends Action {
  payload: any;
}

export interface AppCtx {
  user: User;
}
