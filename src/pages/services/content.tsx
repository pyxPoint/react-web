import {Input, Button, Form, Tabs, Tab, Card, CardBody, Checkbox} from '@heroui/react';
import {useState} from 'react';
import {componentType, PageType} from '@/types';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Loading from '@/components/loading';
import {getPage, sendPageData} from '@/services';
import {useMessageStore} from '@/store/message';
import Editor from '@/components/newEditor';
import {useMutation, useQuery} from '@tanstack/react-query';
import Code500 from '@/components/500';
import tryCatch from 'await-to-js';
import {dataCode} from '@/config';
import {IoArrowBackOutline, IoCloudUpload} from 'react-icons/io5';
import useServicesStore from '@/store/services';
import UploadImg from '@/components/uploadImage';

const PageParams: componentType = ({data, isBack, operateType}) => {
  const [isLoading, setIsLoading] = useState(false),
    {setMessage} = useMessageStore(),
    {register, handleSubmit, control, setValue} = useForm<PageType>({
      defaultValues: data
    }),
    {list} = dataCode,
    {recordEditPageStatus} = useServicesStore();
  const mutation = useMutation({
    mutationFn: (data: PageType) => sendPageData(data, operateType)
  });
  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    setIsLoading(true);
    const [error, res] = await tryCatch(mutation.mutateAsync(formData));
    setIsLoading(false);
    if (error) return setMessage('fail', error.message ?? '', Date.now().toString());
    setMessage('success', (res as any)?.msg ?? 'Successful!', Date.now().toString());
    if (isBack) recordEditPageStatus(list);
  };
  return (
    <>
      <Form
        className="border border-light-gray-100 rounded-lg p-4 h-full overflow-y-auto"
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
                        <label className="text-sm text-gray">Heading</label>
                      </td>
                      <td className="pl-8 py-4 flex items-center">
                        <Controller
                          control={control}
                          name="heading"
                          render={({field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}}) => (
                            <Input
                              ref={ref}
                              isRequired
                              type="text"
                              className="w-[54rem] mt-2"
                              errorMessage={error?.message}
                              placeholder="Enter heading"
                              // Let React Hook Form handle validation instead of the browser.
                              validationBehavior="aria"
                              isInvalid={invalid}
                              name={name}
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                            />
                          )}
                          rules={{required: 'Heading is required.'}}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-4">
                        <label className="text-sm text-gray">Cover</label>
                      </td>
                      <td className="pl-8 ">
                        <div className="flex items-start gap-4">
                          <Controller
                            control={control}
                            name="cover"
                            render={({field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}}) => (
                              <Input
                                ref={ref}
                                isRequired
                                type="text"
                                className="w-96"
                                errorMessage={error?.message}
                                // Let React Hook Form handle validation instead of the browser.
                                validationBehavior="aria"
                                placeholder="Enter cover"
                                isInvalid={invalid}
                                name={name}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                              />
                            )}
                            rules={{required: 'Cover is required.'}}
                          />
                          <UploadImg setValue={(value: string) => setValue('cover', value)}>
                            <Button
                              className="bg-main text-white"
                              isIconOnly
                              endContent={<IoCloudUpload size={18} />}
                            />
                          </UploadImg>
                        </div>
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
                            name="sideBar"
                            render={({field: {name, value, onChange, ref}}) => (
                              <Checkbox
                                ref={ref}
                                size="sm"
                                name={name}
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
                            name="inquiry"
                            render={({field: {name, value, onChange, ref}}) => (
                              <Checkbox
                                ref={ref}
                                size="sm"
                                name={name}
                                onChange={onChange}
                                validationBehavior="aria"
                                defaultSelected={Boolean(value)}
                                classNames={{icon: 'text-white'}}
                              >
                                inquiry
                              </Checkbox>
                            )}
                          />
                          <Controller
                            control={control}
                            name="fullScreen"
                            render={({field: {name, value, onChange, ref}}) => (
                              <Checkbox
                                ref={ref}
                                size="sm"
                                name={name}
                                onChange={onChange}
                                validationBehavior="aria"
                                defaultSelected={Boolean(value)}
                                classNames={{icon: 'text-white'}}
                              >
                                fullScreen
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
          <Tab key="content" title="Content">
            <Card>
              <CardBody className="py-6">
                <table className="w-11/12">
                  <tbody>
                    <tr>
                      <td className="min-w-28 text-right py-4">
                        <label className="text-sm text-gray">Content</label>
                      </td>
                      <td className="pl-8">
                        <Editor
                          label="content"
                          value={data?.content}
                          setValue={setValue}
                          register={register}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="seo" title="SEO">
            <Card>
              <CardBody className="py-6">
                <table className="w-11/12">
                  <tbody>
                    <tr>
                      <td className="min-w-28 text-right py-4">
                        <label className="text-sm text-gray">MetaTitle</label>
                      </td>
                      <td className="pl-8 flex items-center">
                        <Controller
                          control={control}
                          name="metaTitle"
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
                          rules={{required: 'metaTitle is required.'}}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-4">
                        <label className="text-sm text-gray">MetaDescription</label>
                      </td>
                      <td className="pl-8 py-4 flex items-center">
                        <Controller
                          control={control}
                          name="metaDescription"
                          render={({field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}}) => (
                            <Input
                              ref={ref}
                              isRequired
                              type="text"
                              className="w-[54rem] mt-2"
                              errorMessage={error?.message}
                              placeholder="Enter metaDescription"
                              // Let React Hook Form handle validation instead of the browser.
                              validationBehavior="aria"
                              isInvalid={invalid}
                              name={name}
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                            />
                          )}
                          rules={{required: 'MetaDescription is required.'}}
                        />
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
  const data: PageType = {
    id: -1,
    title: '',
    url: '',
    cover: '',
    metaDescription: '',
    metaTitle: '',
    content: '',
    status: 0,
    sideBar: false,
    fullScreen: false,
    inquiry: false
  };
  return (
    <>
      <PageParams data={data} isBack={true} operateType="add" />
    </>
  );
};
const EditContent = () => {
  const pageId = useServicesStore((state) => state.pageId),
    {isLoading, error, data} = useQuery({
      queryKey: ['services', pageId],
      queryFn: () => getPage(pageId ?? -1),
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true
    });
  return isLoading ? <Loading /> : error ? <Code500 /> : <PageParams data={data} operateType="edit" />;
};
const Content = () => {
  const {isAddPage, recordEditPageStatus} = useServicesStore(),
    {list} = dataCode;
  return (
    <div className="relative h-full rounded-xl bg-white">
      <Button
        color="warning"
        className="text-white m-4"
        size="sm"
        isIconOnly
        endContent={<IoArrowBackOutline />}
        onPress={() => {
          recordEditPageStatus(list);
        }}
      ></Button>
      {isAddPage() ? <CreateContent /> : <EditContent />}
    </div>
  );
};
export default Content;
