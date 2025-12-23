import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {IFormLogin, primaryBackType, Info} from '@/types';
import {login, updateToken} from '@/services/user';

interface LoginState {
  userInfo: Info | null;
  user: IFormLogin | null;
  signIn: (formData: IFormLogin) => Promise<null>;
  signOut: () => void;
  setUser: (user: IFormLogin) => void;
  regainingPermissions: () => void;
  rememberUser: (user: IFormLogin) => void;
}
const useLoginStore = create<LoginState>()(
  persist(
    (set, get) => ({
      userInfo: null,
      user: null,
      signIn: async ({rememberMe, ...rest}: IFormLogin) => {
        const {isSuccess, data, errors} = await login(rest);
        if (!isSuccess) throw new Error(errors);
        set(() => ({userInfo: data ?? null, user: rememberMe ? {...rest, rememberMe} : null}));
        return null;
      },
      setUser: (user) => {
        set(() => ({user}));
      },
      signOut: () => {
        set(() => ({userInfo: null}));
      },
      rememberUser: (user) => {
        set(() => ({user}));
      },
      regainingPermissions: async () => {
        const {isSuccess, data}: primaryBackType = await updateToken(get().userInfo);
        isSuccess && set(() => ({userInfo: data}));
      }
    }),
    {
      name: 'web-system-user',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useLoginStore;
