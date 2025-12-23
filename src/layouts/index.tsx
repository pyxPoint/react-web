import Side from './side';
import Header from './header';
import Content from './content';
import {QueryProvider} from '@/providers/queryProvider';

const Layout = () => {
  return (
    <div className="relative flex flex-row  w-full bg-light-gray-100">
      <QueryProvider>
        <div className="sticky top-0 basis-60 min-h-screen bg-white ">
          <Side />
        </div>
        <div className="relative basis-full min-h-screen max-h-screen overflow-y-auto flex flex-col">
          <Header />
          <div className="basis-full px-4 pb-2 ">
            <div className="h-full ">
              <Content />
            </div>
          </div>
        </div>
      </QueryProvider>
    </div>
  );
};

export default Layout;
