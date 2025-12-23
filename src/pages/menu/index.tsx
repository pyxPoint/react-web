import List from './list';
import Content from './content';
import useMenuStore from '@/store/menu';

const Page = () => {
  const {isList} = useMenuStore();
  return isList() ? <List /> : <Content />;
};
export default Page;
