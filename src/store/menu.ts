import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {dataCode} from '@/config';

interface MenuState {
  menuId: number | null;
  updateListTime: string;
  setUpdateListTime: () => void;
  recordEditStatus: (id: number) => void;
  isList: () => boolean;
  isAddMenu: () => boolean;
  resetMenuStatus: () => void;
}
const temporaryStatus = ['locaData', 'currentExcelType', 'guildStepsTypes'];
const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      menuId: dataCode.list,
      updateListTime: crypto.randomUUID(),
      setUpdateListTime: () => set(() => ({updateListTime: crypto.randomUUID()})),
      recordEditStatus: (id) => {
        set(() => ({menuId: id}));
      },
      isList: () => {
        const {menuId} = get(),
          {list} = dataCode;
        return menuId === list;
      },
      isAddMenu: () => {
        const {menuId} = get(),
          {add} = dataCode;
        return menuId === add;
      },
      resetMenuStatus: () => {
        set(() => ({menuId: dataCode.list}));
      }
    }),
    {
      name: 'web-system-menu',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !temporaryStatus.includes(key)))
    }
  )
);

export default useMenuStore;
