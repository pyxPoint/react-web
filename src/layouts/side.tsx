import logoSrc from '@/assets/images/logo-color.jpg';

import {Image} from '@heroui/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {startTransition} from 'react';
import {MenuList} from '@/config';
import useServicesStore from '@/store/services';
import useMenuStore from '@/store/menu';

const LogoItem = () => {
  return (
    <div className="flex flex-row items-center">
      <Image alt="logo" src={logoSrc} className="rounded-full" width={100} />
      <p className="ml-4 font-light ">
        <label className="font-bold font-CALISTB text-lg">Web </label>
        System
      </p>
    </div>
  );
};

const SideList = () => {
  const {pathname} = useLocation(),
    navigate = useNavigate(),
    {resetPageStatus} = useServicesStore(),
    {resetMenuStatus} = useMenuStore();
  function clearStatus() {
    resetPageStatus();
    resetMenuStatus();
  }
  return (
    <div className="mt-6">
      <ul>
        {[...MenuList].map(([key, item]) => (
          <li
            key={key}
            onClick={() =>
              startTransition(() => {
                navigate(item.href, {state: 'alien'});
                clearStatus();
              })
            }
            className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md cursor-pointer 
              transition-all hover:bg-main hover:text-white
              ${pathname === item.href ? 'bg-main text-white' : 'bg-opacity-light-main'} border border-border-color my-2`}
          >
            {item.icon}
            <label>{item.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Side = () => {
  return (
    <div className=" w-full h-full text-dark-main px-6 py-6">
      <LogoItem />
      <SideList />
    </div>
  );
};
export default Side;
