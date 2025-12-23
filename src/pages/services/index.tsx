import List from './list';
import Content from './content';
import useServicesStore from '@/store/services';

const Page = () => {
  const {isList} = useServicesStore();
  return isList() ? <List /> : <Content />;
};
export default Page;
