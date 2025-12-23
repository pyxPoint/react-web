import {Button, Link, Pagination} from '@heroui/react';
import {componentType, MenuType} from '@/types';
import {useRef, useState} from 'react';
import {getMenuList, deleteMenu} from '@/services';
import {IoLinkOutline} from 'react-icons/io5';
import Loading from '@/components/loading';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import NoData from '@/components/noData';
import Code500 from '@/components/500';
import Search from '@/components/search';
import {dataCode} from '@/config';
import useMenuStore from '@/store/menu';
import {FaPencil, FaTrashCan} from 'react-icons/fa6';
import {useMessageStore} from '@/store/message';
import tryCatch from 'await-to-js';
import {Tree, TreeNode} from '@/components/tree';

const LinkMenu: componentType = ({data, className, rank}) => {
  const {recordEditStatus} = useMenuStore(),
    {setMessage} = useMessageStore();
  const deleteHandle = useMutation({
    mutationFn: (id: number) => deleteMenu(id, 'delete')
  });
  const queryClient = useQueryClient();
  return (
    <div className="flex w-full">
      <div className={`${className} text-sm text-main flex items-center group w-full`}>
        <div className="relative flex items-center justify-start w-fit" style={{paddingLeft: `${3 + rank}rem`}}>
          <label
            className="block"
            onClick={() => {
              recordEditStatus(data.id);
            }}
          >
            {data.title}
          </label>
          <div className="absolute left-full translate-x-2 flex items-center drop-shadow-lg">
            <span className="rounded-full w-2 h-2 translate-x-1 aspect-square bg-light-gray group-hover:bg-yellow">
              &nbsp;
            </span>
            <Link
              href={import.meta.env.VITE_BASE_URL + data.url}
              target="_blank"
              className="text-white bg-light-gray text-xs pl-0.5 py-1 rounded transition-all whitespace-nowrap overflow-hidden 
          border border-light-gray w-0  group-hover:px-4 group-hover:w-fit group-hover:bg-yellow group-hover:border-dark-yellow"
              style={{textShadow: '0 -1px rgba(1, 1, 1, 0.4)'}}
            >
              {data.url}
              <IoLinkOutline
                className="inline-block mr-2"
                style={{transform: 'rotateZ(-40deg) translateX(5px) translateY(5px)'}}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="min-w-16">{data.order}</div>
      <div className="min-w-60 flex justify-center gap-2">
        <Button
          color="primary"
          isIconOnly
          className="text-main bg-opacity-light-main"
          size="sm"
          endContent={<FaPencil />}
          onPress={() => {
            recordEditStatus(data.id);
          }}
        ></Button>
        <Button
          color="danger"
          className="text-red bg-light-red-100"
          size="sm"
          isIconOnly
          endContent={<FaTrashCan />}
          onPress={async () => {
            const [error, res] = await tryCatch(deleteHandle.mutateAsync(data.id));
            if (error) return setMessage('fail', error.message ?? '', Date.now().toString());
            setMessage('success', (res as any).msg ?? '', Date.now().toString());
            queryClient.invalidateQueries({queryKey: ['menus']});
          }}
        ></Button>
      </div>
    </div>
  );
};
const ListMenu: componentType = ({data, className, rank}) => {
  return (
    <>
      <Tree className={`${className ?? ''}`}>
        {data?.map(({id, title, url, order, children}: MenuType) => (
          <TreeNode
            key={id}
            className="relative py-2 border-b-1 border-light-gray-100 text-sm text-main w-full hover:bg-opacity-main-100"
            classNames={{
              icon: 'absolute left-2'
            }}
            rank={rank}
            isChild={!!children}
            subtitle={<LinkMenu rank={rank} data={{id, title, url, order}} />}
          >
            {!!children && <ListMenu data={children} rank={rank + 1} />}
          </TreeNode>
        ))}
      </Tree>
    </>
  );
};
const PaginationBlock: componentType = ({currentPage, setCurrentPage, total, perPage}) => {
  return (
    <div className="bg-white rounded-xl p-4 mt-4 ">
      <div className="flex gap-2">
        <Button size="sm" variant="flat" onPress={() => setCurrentPage((prev: number) => (prev > 1 ? prev - 1 : prev))}>
          Previous
        </Button>
        <Pagination
          classNames={{cursor: 'text-white'}}
          size="sm"
          page={currentPage}
          total={total}
          onChange={setCurrentPage}
        />
        <Button
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage((prev: number) => (prev < perPage ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
const List: componentType = () => {
  const [currentPage, setCurrentPage] = useState(1),
    {add} = dataCode,
    [searchKey, setSearchKey] = useState<string>(''),
    {recordEditStatus, updateListTime} = useMenuStore();
  const numberPerPage = useRef(10);
  const {isLoading, error, data} = useQuery({
    queryKey: ['menus', searchKey, updateListTime],
    queryFn: () =>
      getMenuList(searchKey === '' ? null : {title: searchKey, currentPage, numberPerPage: numberPerPage.current})
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Code500 />
      ) : (
        <>
          <div className="flex justify-between items-center my-4">
            <Button
              color="warning"
              className="text-white mx-2"
              size="sm"
              onPress={() => {
                recordEditStatus(add);
              }}
            >
              Add
            </Button>
            <Search className="my-0" label="Search" defaultValue={searchKey} setKeyWords={setSearchKey} />
          </div>
          {!!Array.isArray(data) ? (
            <>
              <div className="min-h-[80%] bg-white rounded-xl p-4">
                <div>
                  <ul className="flex border-b-1 border-light-gray py-2 px-1 my-2 text-gray bg-opacity-light-green">
                    <li className="w-full">Name</li>
                    <li className="min-w-16">Order</li>
                    <li className="min-w-60 text-center">Operate</li>
                  </ul>
                  <ListMenu data={data} rank={0} />
                </div>
              </div>
              <PaginationBlock currentPage={currentPage} setCurrentPage={setCurrentPage} total={1} perPage={10} />
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  );
};

export default List;
