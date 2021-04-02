import { ReactNode, HTMLAttributes } from 'react';
import { ForumCommentLayout, HelpForumDoc } from '.';

export interface LayoutProps {
  title: string;
  children: ReactNode;
}

export interface ForumCommentProps {
  data: ForumCommentLayout;
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
