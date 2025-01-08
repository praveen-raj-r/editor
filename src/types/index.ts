import { FC } from "react";
export type chartTypes = "daily" | "weekly" | "monthly";
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  message: string;
}

export interface ApiError {
  message: string;
}

export interface SignUpApiData {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface LoginApiData {
  username: string;
  password: string;
}

export interface DomainFormApiData {
  domainName: string;
}

export interface ForgotPasswordApiData {
  email: string;
}

export interface LinksProps {
  target: string;
  href: string;
  children: React.ReactNode;
  disabled: boolean;
}

export interface NavMainProps {
  items: {
    title: string;
    url?: string;
    icon?: string;
    isActive?: boolean;
    items?: {
      title: string;
      url?: string;
      icon?: string;
    }[];
  }[];
}

export interface NavItemProps {
  item: {
    title: string;
    url?: string;
    icon?: string;
    isActive?: boolean;
    items?: {
      title: string;
      url?: string;
      icon?: string;
    }[];
  };
  IconComponent: FC | null;
}
