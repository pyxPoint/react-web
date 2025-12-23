import {Button, Link, Pagination} from '@heroui/react';
import {componentType} from '@/types';
import {useRef, useState} from 'react';
import {deletePage, getServicesList} from '@/services';
import {IoLinkOutline} from 'react-icons/io5';
import Loading from '@/components/loading';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import NoData from '@/components/noData';
import Code500 from '@/components/500';
import Search from '@/components/search';
import {dataCode} from '@/config';
import useServicesStore from '@/store/services';
import tryCatch from 'await-to-js';
import {useMessageStore} from '@/store/message';
import {FaFileCode, FaPencil, FaTrashCan} from 'react-icons/fa6';

const ListItem: componentType = ({id, title, url}) => {
  const {recordEditPageStatus} = useServicesStore(),
    {setMessage} = useMessageStore();
  const deleteHandle = useMutation({
    mutationFn: (id: number) => deletePage(id, 'delete')
  });
  const queryClient = useQueryClient();
  return (
    <li>
      <div className="grid grid-cols-12 border-b-1 border-light-gray-100 py-2 px-2 hover:bg-opacity-main-100">
        <div className="col-span-5 flex items-center">
          <FaFileCode className="text-main" size={15} />
          <p
            title="edit"
            className="mx-2 text-sm text-main cursor-pointer hover:underline"
            onClick={() => {
              recordEditPageStatus(id);
            }}
          >
            {title}
          </p>
        </div>
        <div className="col-span-5">
          <p className="text-xs">
            /{url}
            <Link
              showAnchorIcon
              color="primary"
              target="_blank"
              anchorIcon={<IoLinkOutline />}
              href={import.meta.env.VITE_BASE_URL + url}
              style={{transform: `rotateZ(-40deg) translateY(6px)`}}
            ></Link>
          </p>
        </div>
        <div className="col-span-2 flex justify-center gap-2">
          <Button
            color="primary"
            isIconOnly
            className="text-main bg-opacity-light-main"
            size="sm"
            endContent={<FaPencil />}
            onPress={() => {
              recordEditPageStatus(id);
            }}
          ></Button>
          <Button
            color="danger"
            className="text-red bg-light-red-100"
            size="sm"
            isIconOnly
            endContent={<FaTrashCan />}
            onPress={async () => {
              const [error, res] = await tryCatch(deleteHandle.mutateAsync(id));
              if (error) return setMessage('fail', error.message ?? '', Date.now().toString());
              setMessage('success', (res as any).msg ?? '', Date.now().toString());
              queryClient.invalidateQueries({queryKey: ['services']});
            }}
          ></Button>
        </div>
      </div>
    </li>
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
    {recordEditPageStatus} = useServicesStore();
  const numberPerPage = useRef(10);

  const {isLoading, error, data} = useQuery({
    queryKey: ['services', searchKey],
    queryFn: () =>
      getServicesList(searchKey === '' ? null : {title: searchKey, currentPage, numberPerPage: numberPerPage.current})
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
                recordEditPageStatus(add);
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
                  <ul className="grid grid-cols-12 border-b-1 border-light-gray py-2 px-1 my-2 text-gray bg-opacity-light-green">
                    <li className="col-span-5">title</li>
                    <li className="col-span-5">url</li>
                    <li className="col-span-2 text-center">operate</li>
                  </ul>
                  <ul>{data?.map((page) => <ListItem key={page.id} {...page} />)}</ul>
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
