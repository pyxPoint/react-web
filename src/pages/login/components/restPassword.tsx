import {memo, useState} from 'react';
import {Button, Input, Form} from '@heroui/react';
import {IoEyeSharp, IoEyeOffSharp} from 'react-icons/io5';
import {useForm, SubmitHandler} from 'react-hook-form';
import useLoginStore from '@/store/user';
import {componentType, IFormLogResetPassword} from '@/types';
import {useMessageStore} from '@/store/message';
import {useMutation} from '@tanstack/react-query';
import {logResetPassword, sendCode} from '@/services/user';
import {initKey} from '@/config';

const ResetPassword: componentType = memo(({className, children, handleToggleView}) => {
  const [isVisible, setIsVisible] = useState(false),
    [isloading, setIsLoading] = useState(false),
    [sendloading, setSendLoading] = useState(false),
    {setUser} = useLoginStore(),
    [isConfirmVisible, setIsConfirmVisible] = useState(false),
    {setMessage} = useMessageStore(),
    {register, handleSubmit, watch} = useForm<IFormLogResetPassword>();

  const mutationForm = useMutation({
    mutationFn: logResetPassword,
    onSuccess: ({isSuccess, errors}) => {
      setIsLoading(false);
      if (!isSuccess) return setMessage('fail', errors ?? 'failed', Date.now().toString());
      setMessage('success', 'Success, Please log in again!', Date.now().toString());
    },
    onError: (error) => {
      setMessage('fail', error.message, Date.now().toString());
    }
  });
  const onSubmit: SubmitHandler<IFormLogResetPassword> = async (formData) => {
    setIsLoading(true);
    await mutationForm.mutateAsync(formData);
    setIsLoading(false);
    setUser({email: formData.email, password: formData.password, rememberMe: true});
    handleToggleView(initKey);
    setIsLoading(false);
  };
  const mutationCode = useMutation({
    mutationFn: sendCode,
    onSuccess: ({isSuccess, errors}) => {
      setSendLoading(false);
      if (!isSuccess) return setMessage('fail', errors ?? 'failed', Date.now().toString());
      setMessage('success', 'Verification code sent successfully', Date.now().toString());
    },
    onError: (error) => {
      setSendLoading(false);
      setMessage('fail', error.message, Date.now().toString());
    }
  });
  const handleSendCode = async () => {
    setSendLoading(true);
    await mutationCode.mutateAsync({email: watch('email')});
    //setIsLoading(false);
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className={className}>
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="text-3xl font-bold text-white font-CALISTB m-auto">RESET PASSWORD</p>
        <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            label="Email"
            radius="full"
            className="!outline-hidden"
            classNames={{inputWrapper: 'bg-opacity-white-50 backdrop-blur-sm'}}
            errorMessage="Please enter a valid email"
            placeholder="Enter your email"
            type="email"
            {...register('email', {required: true})}
          />
          <div className="flex justify-between gap-2 w-full items-end">
            <Input
              isRequired
              label="Code"
              radius="full"
              className="!outline-hidden"
              classNames={{inputWrapper: 'bg-opacity-white-50 backdrop-blur-sm'}}
              errorMessage="Please enter a valid email"
              placeholder="Enter Code"
              type="text"
              {...register('code', {required: true})}
            />
            <Button
              radius="full"
              color="warning"
              isLoading={sendloading}
              className="text-white"
              onClick={() => handleSendCode()}
            >
              Send
            </Button>
          </div>
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <IoEyeOffSharp color="main" /> : <IoEyeSharp color="main" />}
              </button>
            }
            label="Password"
            radius="full"
            className="!outline-hidden"
            classNames={{inputWrapper: 'bg-opacity-white-50 backdrop-blur-sm'}}
            placeholder="Enter your password"
            validate={(value) => {
              if (value.length < 8) return 'Username must be at least 8 characters long';
            }}
            {...register('password', {required: true})}
            type={isVisible ? 'text' : 'password'}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? <IoEyeOffSharp color="main" /> : <IoEyeSharp color="main" />}
              </button>
            }
            label="Confirm Password"
            radius="full"
            className="!outline-hidden"
            classNames={{inputWrapper: 'bg-opacity-white-50 backdrop-blur-sm'}}
            placeholder="Confirm your password"
            errorMessage="Please keep the password consistent"
            validate={(value) => {
              if (value !== watch('password')) return 'Please keep the password consistent';
            }}
            {...register('password_confirmation', {required: true})}
            type={isConfirmVisible ? 'text' : 'password'}
          />
          <Button
            radius="full"
            variant="solid"
            size="lg"
            color="primary"
            className="w-full bg-main text-white py-7"
            type="submit"
            isLoading={isloading}
          >
            Rest
          </Button>
        </Form>
        {children}
      </div>
    </div>
  );
}) as componentType;

export default ResetPassword;
