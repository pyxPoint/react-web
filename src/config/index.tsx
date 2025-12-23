import {FaChartArea, FaListUl} from 'react-icons/fa6';

export const SearchParamsValue = new Map([
  ['currentPage', 'page'],
  ['numberPerPage', 'per_page']
]);
export const SearchListParams = ['name', 'currentPage', 'numberPerPage'];
export const analysisParams = ['SampleInfo'];
const [initKey, registerKey, forgetKey] = ['login', 'register', 'forget'];
export {initKey, registerKey, forgetKey};
export const dataCode = {list: -2, add: -1};
export const OperateCode: Record<string, string> = {add: 'POST', edit: 'PUT', delete: 'DELETE'};
export const MenuList = new Map([
  [
    'menu',
    {
      tag: 'menu',
      label: 'Menu',
      href: '/menu',
      icon: <FaListUl />
    }
  ],
  [
    'services',
    {
      tag: 'services',
      label: 'Services',
      href: '/services',
      icon: <FaChartArea />
    }
  ]
]);
