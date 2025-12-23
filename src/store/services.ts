import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {dataCode} from '@/config';

interface ServicesState {
  pageId: number | null;
  recordEditPageStatus: (id: number) => void;
  isList: () => boolean;
  isAddPage: () => boolean;
  resetPageStatus: () => void;
}
const temporaryStatus = ['locaData', 'currentExcelType', 'guildStepsTypes'];
const useServicesStore = create<ServicesState>()(
  persist(
    (set, get) => ({
      pageId: dataCode.list,
      recordEditPageStatus: (id) => {
        set(() => ({pageId: id}));
      },
      isList: () => {
        const {pageId} = get(),
          {list} = dataCode;
        return pageId === list;
      },
      isAddPage: () => {
        const {pageId} = get(),
          {add} = dataCode;
        return pageId === add;
      },
      resetPageStatus: () => {
        set(() => ({pageId: dataCode.list}));
      }
    }),
    {
      name: 'web-system',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !temporaryStatus.includes(key)))
    }
  )
);

export default useServicesStore;
