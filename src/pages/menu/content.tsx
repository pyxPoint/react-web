import {
  Input,
  Button,
  Form,
  Tabs,
  Tab,
  Card,
  CardBody,
  Checkbox,
  NumberInput,
  Select,
  SelectItem,
  Skeleton
} from '@heroui/react';
import {useState} from 'react';
import {componentType, MenuType} from '@/types';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Loading from '@/components/loading';
import {getMenu, sendMenuData, getMenuListContent} from '@/services';
import {useMessageStore} from '@/store/message';
import {useMutation, useQuery} from '@tanstack/react-query';
import Code500 from '@/components/500';
import tryCatch from 'await-to-js';
import {dataCode} from '@/config';
import {IoArrowBackOutline} from 'react-icons/io5';
import {IoMdCode} from 'react-icons/io';
import useMenuStore from '@/store/menu';
import {ShowTogglePage} from './components/showTogglePage';

const SelectParents: componentType = ({className, name, setValue, id}) => {
  const {updateListTime} = useMenuStore();
  const {isLoading, data} = useQuery({
    queryKey: ['getMenuList', updateListTime],
    queryFn: getMenuListContent
  });
  return (
    <Skeleton className="rounded-lg" isLoaded={!isLoading}>
      {!!data && (
        <Select
          className={`${className}`}
          placeholder="Select parent"
          hideEmptyContent
          defaultSelectedKeys={[String(id)]}
          onSelectionChange={([value]) => {
            setValue(name, Number(value));
          }}
          selectorIcon={<IoMdCode style={{transform: 'rotate(90deg)'}} />}
        >
          {data.map((menu) => (
            <SelectItem key={String(menu.id)}>{menu?.title}</SelectItem>
          ))}
        </Select>
      )}
    </Skeleton>
  );
};

const PageParams: componentType = ({data, operateType, afterSubmitHandle}) => {
  const [isLoading, setIsLoading] = useState(false),
    {setMessage} = useMessageStore(),
    {register, handleSubmit, control, setValue} = useForm<MenuType>({
      defaultValues: data
    }),
    {setUpdateListTime} = useMenuStore();
  const mutation = useMutation({
    mutationFn: (data: MenuType) => sendMenuData(data, operateType)
  });
  const onSubmit: SubmitHandler<MenuType> = async (formData) => {
    setIsLoading(true);
    const [error, res] = await tryCatch(mutation.mutateAsync(formData));
    setIsLoading(false);
    if (error) return setMessage('fail', error.message ?? '', Date.now().toString());
    setMessage('success', (res as any)?.msg ?? 'Successful!', Date.now().toString());
    operateType === 'edit' && setUpdateListTime?.();
    afterSubmitHandle?.();
  };
  return (
    <>
      <Form
        className="border border-light-gray-100 rounded-lg p-4 h-full overflow-y-auto z-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('url')} />
        <input type="hidden" {...register('status')} />
        <Tabs aria-label="Options">
          <Tab key="base" title="Basic">
            <Card>
              <CardBody className="py-6">
                <table className="w-11/12">
                  <tbody>
                    <tr>
                      <td className="min-w-28 text-right py-4">
                        <label className="text-sm text-gray">Parent</label>
                      </td>
                      <td className="pl-8 flex items-center">
                        <SelectParents
                          className="w-[54rem] mt-2"
                          id={data.parentId}
                          name="parentId"
                          setValue={setValue}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="min-w-28 text-right py-4">
                        <label className="text-sm text-gray">Title</label>
                      </td>
                      <td className="pl-8 flex items-center">
                        <Controller
                          control={control}
                          name="title"
                          render={({field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}}) => (
                            <Input
                              ref={ref}
                              isRequired
                              type="text"
                              className="w-[54rem] mt-2"
                              errorMessage={error?.message}
                              placeholder="Enter title"
                              // Let React Hook Form handle validation instead of the browser.
                              validationBehavior="aria"
                              isInvalid={invalid}
                              name={name}
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                            />
                          )}
                          rules={{required: 'Title is required.'}}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-4">
                        <label className="text-sm text-gray">Url</label>
                      </td>
                      <td className="pl-8 py-4 flex items-center">
                        <Controller
                          control={control}
                          name="url"
                          render={({field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}}) => (
                            <Input
                              ref={ref}
                              type="text"
                              className="w-[54rem] mt-2"
                              errorMessage={error?.message}
                              placeholder="url"
                              // Let React Hook Form handle validation instead of the browser.
                              validationBehavior="aria"
                              isInvalid={invalid}
                              name={name}
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-4">
                        <label className="text-sm text-gray">Order</label>
                      </td>
                      <td className="pl-8 py-4 flex items-center">
                        <Controller
                          control={control}
                          name="order"
                          render={({field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}}) => (
                            <NumberInput
                              ref={ref}
                              isRequired
                              size="sm"
                              className="w-[20rem] mt-2"
                              classNames={{inputWrapper: 'h-10'}}
                              errorMessage={error?.message}
                              placeholder="order"
                              // Let React Hook Form handle validation instead of the browser.
                              validationBehavior="aria"
                              isInvalid={invalid}
                              name={name}
                              value={value ?? 0}
                              onBlur={onBlur}
                              onChange={onChange}
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-4">
                        <label className="text-sm text-gray">Others</label>
                      </td>
                      <td className="pl-8 ">
                        <div className="flex items-start gap-4">
                          <Controller
                            control={control}
                            name="mainMenu"
                            render={({field: {name, value, onChange, ref}, fieldState: {}}) => (
                              <Checkbox
                                ref={ref}
                                size="sm"
                                name={name}
                                onChange={onChange}
                                validationBehavior="aria"
                                defaultSelected={Boolean(value)}
                                classNames={{icon: 'text-white'}}
                              >
                                mainMenu
                              </Checkbox>
                            )}
                          />
                          <Controller
                            control={control}
                            name="sideBar"
                            render={({field: {name, value, onChange, ref}, fieldState: {}}) => (
                              <Checkbox
                                ref={ref}
                                name={name}
                                size="sm"
                                onChange={onChange}
                                validationBehavior="aria"
                                defaultSelected={Boolean(value)}
                                classNames={{icon: 'text-white'}}
                              >
                                sideBar
                              </Checkbox>
                            )}
                          />
                          <Controller
                            control={control}
                            name="breadcrumbs"
                            render={({field: {name, value, onChange, ref}, fieldState: {invalid}}) => (
                              <Checkbox
                                ref={ref}
                                isInvalid={invalid}
                                name={name}
                                size="sm"
                                onChange={onChange}
                                isRequired
                                validationBehavior="aria"
                                defaultSelected={Boolean(value)}
                                classNames={{icon: 'text-white'}}
                              >
                                breadcrumbs
                              </Checkbox>
                            )}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        <Button size="sm" type="submit" className="mr-2 text-white bg-main" isLoading={isLoading}>
          Save
        </Button>
      </Form>
    </>
  );
};
const CreateContent = () => {
  const data: MenuType = {
      id: -1,
      title: '',
      url: '',
      status: 0,
      order: 0,
      mainMenu: true,
      breadcrumbs: true,
      sideBar: false,
      parentId: -1
    },
    [show, setShow] = useState(false);
  function handleCreatePage() {
    setShow(true);
  }
  return (
    <>
      <PageParams data={data} isBack={true} operateType="add" afterSubmitHandle={handleCreatePage} />
      <ShowTogglePage show={show} />
    </>
  );
};
const EditContent = () => {
  const pageId = useMenuStore((state) => state.menuId),
    {isLoading, error, data} = useQuery({
      queryKey: ['menu', pageId],
      queryFn: () => getMenu(pageId ?? -1),
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true
    });
  return isLoading ? <Loading /> : error ? <Code500 /> : <PageParams data={data} operateType="edit" />;
};
const Content = () => {
  const {isAddMenu, recordEditStatus} = useMenuStore(),
    {list} = dataCode;
  return (
    <div className="relative h-full rounded-xl bg-white">
      <Button
        color="warning"
        className="text-white m-4 z-10"
        size="sm"
        isIconOnly
        endContent={<IoArrowBackOutline />}
        onPress={() => {
          recordEditStatus(list);
        }}
      ></Button>
      {isAddMenu() ? <CreateContent /> : <EditContent />}
    </div>
  );
};
export default Content;
