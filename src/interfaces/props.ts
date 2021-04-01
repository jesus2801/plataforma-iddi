import { ReactNode, HTMLAttributes } from 'react';

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

export interface ProfileImgProps {
  size: string;
  url?: string;
}

export interface SearchProps {
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
