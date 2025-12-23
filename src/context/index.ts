import {createContext} from 'react';

export interface SetPageContextType {
  pageId: number;
  setPageId: React.Dispatch<React.SetStateAction<number>>;
}
export const HandleSetPageContext = createContext<SetPageContextType>({} as SetPageContextType);
export interface ToggleSideBarType {
  menuKey: string;
  // handle: React.Dispatch<React.SetStateAction<string>>;
}
export const ToggleSideBarContext = createContext<ToggleSideBarType>({} as ToggleSideBarType);
