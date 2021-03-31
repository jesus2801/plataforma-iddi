import type { Action } from 'redux';
import { PublicUserInfo, User } from './index';

export interface AppActions extends Action {
  payload: any;
}

export interface UserCtx {
  personal: User;
  publicInfo: null | PublicUserInfo;
}

export interface AppCtx {
  user: UserCtx;
}
