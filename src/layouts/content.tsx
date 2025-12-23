import {Outlet} from 'react-router-dom';
import AlertModal from '@/components/alert';

const Content = () => {
  return (
    <>
      <div className="relative py-2 flex flex-col h-full ">
        <AlertModal />
        <Outlet />
      </div>
    </>
  );
};

export default Content;
