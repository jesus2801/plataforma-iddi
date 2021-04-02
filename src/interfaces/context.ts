import { HelpForumDoc, PublicUserInfo, User } from './index';
import type { Action } from 'redux';

import fb from 'firebase/app';

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
  selectedForumRef: fb.firestore.DocumentReference<fb.firestore.DocumentData> | null;
}

export interface AppCtx {
  user: UserCtx;
  forums: ForumsCtx;
}
