import { ReactNode, HTMLAttributes } from 'react';
import { HelpForumDoc } from '.';

export interface LayoutProps {
  title: string;
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

export interface SearchProps extends HTMLAttributes<HTMLElement> {
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
