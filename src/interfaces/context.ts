import { HelpForumDoc, PublicUserInfo, User } from './index';
import type { Action } from 'redux';

export interface AppActions extends Action {
  payload: any;
}

export interface UserCtx {
  personal: User;
  publicInfo: null | PublicUserInfo;
}

export interface ForumsCtx {
  forums: HelpForumDoc[];
  selectedForum: HelpForumDoc | null;
  isLoading: boolean;
}

export interface AppCtx {
  user: UserCtx;
  forums: ForumsCtx;
}
