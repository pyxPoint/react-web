import {Navbar, NavbarContent, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from '@heroui/react';
import useLoginStore from '@/store/user';
import userLogo from '@/assets/images/user.png';
import {startTransition} from 'react';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const {signOut} = useLoginStore(),
    navigate = useNavigate();
  //const { name } = jwtDecode(userInfo?.accessToken ?? "") as UserType;

  return (
    <div className="sticky top-0 px-4 py-2 z-40 ">
      <div className="bg-white overflow-hidden rounded-xl">
        <Navbar
          className="cursor-pointer"
          classNames={{
            base: 'bg-transparent',
            wrapper: 'max-w-full',
            content: 'bg-transparent '
          }}
        >
          <NavbarContent as="div" justify="end">
            <Dropdown size="sm" placement="bottom-end" classNames={{content: 'min-w-max'}}>
              <DropdownTrigger>
                <div className="flex justify-center items-center">
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform cursor-pointer"
                    color="primary"
                    size="sm"
                    showFallback
                    style={{color: '#6D5D9B'}}
                    src={userLogo}
                  />
                  <p className="text-sm ml-4 font-light ">{/*  <label>{name}</label> */}</p>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="restpassword"
                  color="warning"
                  onClick={() => {
                    startTransition(() => {
                      navigate('/account', {state: 'alien'});
                    });
                  }}
                >
                  Account
                </DropdownItem>
                <DropdownItem key="logout" color="warning" onClick={signOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
