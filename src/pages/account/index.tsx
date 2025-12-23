import {restPassword} from '@/services/user';
import {IFormResetPassword} from '@/types';
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tab,
  Tabs,
  useDisclosure
} from '@heroui/react';
import {useRef, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {IoEyeOffSharp, IoEyeSharp} from 'react-icons/io5';
import {useMutation} from '@tanstack/react-query';
import {useAlertStore, useMessageStore} from '@/store/message';

const ResetPassword = () => {
  const [isVisible, setIsVisible] = useState(false),
    [isConfirmVisible, setIsConfirmVisible] = useState(false),
    [isloading, setIsLoading] = useState(false),
    {handleSubmit, control} = useForm<IFormResetPassword>(),
    {setMessage} = useMessageStore(),
    alertStore = useAlertStore();
  const {isOpen, onOpen, onOpenChange} = useDisclosure(),
    submitBtn = useRef<HTMLButtonElement>(null);

  const mutation = useMutation({
    mutationFn: restPassword,
    onSuccess: ({isSuccess, errors}) => {
      setIsLoading(false);
      if (!isSuccess) return setMessage('fail', errors, Date.now().toString());
      alertStore.setMessage('success', 'Success, Please log in again!', Date.now().toString());
    },
    onError: (error) => {
      setIsLoading(false);
      setMessage('fail', error.message, Date.now().toString());
    }
  });
  const onSubmit: SubmitHandler<IFormResetPassword> = async (formData) => {
    setIsLoading(true);
    mutation.mutate(formData);
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  return (
    <>
      <Form
        className="flex flex-col gap-8 max-w-max border border-light-gray px-8 py-12 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="password"
          defaultValue={''}
          render={(
            {field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}} //{name, value, onChange, onBlur, ref}
          ) => (
            <Input
              labelPlacement="outside"
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? <IoEyeOffSharp color="main" /> : <IoEyeSharp color="main" />}
                </button>
              }
              ref={ref}
              size="sm"
              name={name}
              isRequired
              errorMessage={error?.message}
              validationBehavior="aria"
              isInvalid={invalid}
              label="Password"
              type={isVisible ? 'text' : 'password'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder="Enter your password"
            />
          )}
          rules={{required: 'Please enter a valid password', minLength: 8}}
        />
        <Controller
          control={control}
          name="confirmPassword"
          defaultValue={''}
          render={(
            {field: {name, value, onChange, onBlur, ref}, fieldState: {invalid, error}} //{name, value, onChange, onBlur, ref}
          ) => (
            <Input
              labelPlacement="outside"
              endContent={
                <button type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? <IoEyeOffSharp color="main" /> : <IoEyeSharp color="main" />}
                </button>
              }
              ref={ref}
              size="sm"
              name={name}
              isRequired
              errorMessage={error?.message || 'Please enter a valid confirm password'}
              validationBehavior="aria"
              isInvalid={invalid}
              label="Confirm Password"
              type={isConfirmVisible ? 'text' : 'password'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder="Confirm your password"
            />
          )}
          rules={{
            validate: (value, formValues) => value === formValues.password || `Please keep the password consistent`
          }}
        />
        <button type="submit" className="hidden" ref={submitBtn}></button>
        <Button
          radius="full"
          variant="solid"
          size="md"
          color="primary"
          className="w-full bg-main text-white"
          isLoading={isloading}
          onPress={onOpen}
        >
          Rest
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <p className="text-center mt-8 text-md">Reset password ?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" size="sm" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    className="text-white"
                    onPress={() => {
                      submitBtn?.current?.click();
                      onClose();
                    }}
                  >
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Form>
    </>
  );
};
const Account = () => {
  return (
    <div className="bg-white p-4 rounded-xl min-h-full">
      <Tabs aria-label="Options">
        <Tab key="restpassword" title="New Password">
          <ResetPassword />
        </Tab>
      </Tabs>
    </div>
  );
};
export default Account;
