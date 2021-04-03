import { ReactNode, HTMLAttributes } from 'react';
import {
  ForumAnswersLayout,
  ForumCommentLayout,
  HelpForumDoc,
  PublicUserInfo,
  FirebaseDocReference,
} from '.';

export interface LayoutProps {
  title: string;
  children: ReactNode;
}

export interface ForumAnswerProps {
  data: ForumAnswersLayout;
  creator: PublicUserInfo | null;
}

export interface ForumCommentProps {
  data: ForumCommentLayout;
  creator: PublicUserInfo | null;
  docRef: FirebaseDocReference;
}

export interface SvgProps {
  path: string;
}

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  minWidth: string;
  width?: string;
}

export interface ForumPreviewProps {
  data: HelpForumDoc;
}

export interface ProfileImgProps {
  size: string;
  url?: string;
}

export interface SearchProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  width: string;
}

export interface NavProps {
  state: boolean;
}

export interface AppPageProps {
  unSuscribe: boolean;
}

export interface AppLayoutProps {
  title: string;
}
