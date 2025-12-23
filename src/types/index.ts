export type Info = {
  token: string;
};
export interface UserType {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: string;
  status?: pageStatus;
}

export interface IFormLogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}
export interface IFormLogup {
  name: string;
  password: string;
  repeatPassword: string;
  email: string;
}
export type LoginBackend = {
  isSuccess: boolean;
  data?: Info;
  errors?: [];
};
export type MessageType = 'default' | 'success' | 'error';
export type ColorType = 'default' | 'success' | 'danger' | 'primary' | 'secondary' | 'warning' | undefined;
export interface UserFormType {
  name: string;
  password: string;
  confirmpassword: string;
  email?: string;
}
export type componentParams<T extends keyof JSX.IntrinsicElements> = {
  children?: React.ReactNode;
  type?: T;
  className?: string;
  [key: string]: any;
};
export type asyncComponentType = <T extends keyof JSX.IntrinsicElements>(
  params: componentParams<T>
) => Promise<JSX.Element>;
export type componentType = <T extends keyof JSX.IntrinsicElements>(params: componentParams<T>) => JSX.Element;

export type AnalysisItemType = {
  id: number;
  name: string;
  label: string;
  description: string;
  cover: string;
};

export type LocalItemDataType = {
  [type: string]: string[][];
};
export type LocalDataType = {
  [key: string]: LocalItemDataType;
};
export type SearchParamsType = {
  title: string;
  currentPage: number;
  numberPerPage: number;
};
export type GetFileApi = (url: string[]) => Promise<{
  isSuccess: boolean;
  data: any[];
  message: string;
}>;

export type RenderScriptType = (formData: any) => Promise<{
  isSuccess: boolean;
  data?: string[] | string;
  errors?: string;
}>;

export interface IFormResetPassword {
  password: string;
  confirmPassword: string;
}

export interface IFormLogResetPassword {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}
export interface SendCodeType {
  email: string;
}
export interface FetchParams {
  url: string;
  method: string;
  headers?: HeadersInit;
  isToken?: boolean;
  body?: any;
  toast?: boolean;
}
export interface primaryBackType {
  isSuccess: boolean;
  data?: any;
  errors?: string;
}
export type FetchType = (params: FetchParams) => Promise<primaryBackType>;
export type FetchTestType = <T>(params: FetchParams) => Promise<T | void>;
export type LogTabType = 'login' | 'register' | 'forget';
type pageStatus = -1 | 0 | 1;
export interface PageType {
  id: number;
  title: string;
  heading?: string;
  sideBar?: boolean;
  inquiry?: boolean;
  fullScreen?: boolean;
  url?: string;
  cover?: string;
  metaDescription?: string;
  metaTitle?: string;
  content: string;
  status: pageStatus;
}

export interface LoginBackType {
  token: string;
}
export interface SearchFormType {
  keyWords: string;
}
export type ImageData = string | ArrayBuffer | Buffer;
export interface SocketImageType {
  images: ArrayBuffer;
  fileName: string;
  mimeType: string;
  format: string;
}
export interface MenuType {
  id: number;
  title: string;
  url: string;
  children?: MenuType[];
  parentId?: number;
  status: pageStatus;
  order: number;
  mainMenu: boolean;
  breadcrumbs: boolean;
  sideBar: boolean;
}
export interface MenusContentType {
  id: number;
  title: string;
}
export interface TreeType {
  id: number;
  key: string;
  name: string;
  children?: TreeType[];
}
