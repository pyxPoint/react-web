import {Button, Input, Form} from '@heroui/react';
import {memo, useState} from 'react';
import {IoEyeSharp, IoEyeOffSharp} from 'react-icons/io5';
import {useForm, SubmitHandler} from 'react-hook-form';
import useLoginStore from '@/store/user';
import {componentType, IFormLogup} from '@/types';
import {register as userRegister} from '@/services/user';
import {useMessageStore} from '@/store/message';
import {initKey} from '@/config';
import {useMutation} from '@tanstack/react-query';
import tryCatch from 'await-to-js';

const SignUp: componentType = memo(({className, children, handleToggleView}) => {
  const [isVisible, setIsVisible] = useState(false),
    [isloading, setIsLoading] = useState(false),
    {setUser} = useLoginStore(),
    [isConfirmVisible, setIsConfirmVisible] = useState(false),
    {setMessage} = useMessageStore(),
    {register, handleSubmit, watch} = useForm<IFormLogup>();

  const mutation = useMutation({
    mutationFn: userRegister
  });
  const onSubmit: SubmitHandler<IFormLogup> = async (formData) => {
    setIsLoading(true);
    const [error] = await tryCatch(mutation.mutateAsync(formData));
    setIsLoading(false);
    if (error) return setMessage('fail', error.message ?? '', Date.now().toString());
    setUser({email: formData.email, password: formData.password, rememberMe: true});
    setMessage('success', 'Successful registration', Date.now().toString());
    handleToggleView(initKey);
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className={className}>
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="text-4xl font-bold text-white font-CALISTB m-auto">SING UP</p>
        <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="Username"
            isRequired
            radius="full"
            className="!outline-hidden bg-transparent"
            classNames={{inputWrapper: 'bg-opacity-white-50 backdrop-blur-sm'}}
            errorMessage="Please enter a valid username"
            {...register('name', {required: true})}
            placeholder="Enter your username"
          />
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
            validate={(value) => {
              if (value !== watch('password')) return 'Please keep the password consistent';
            }}
            {...register('repeatPassword', {required: true})}
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
            SING UP
          </Button>
        </Form>
        {children}
      </div>
    </div>
  );
}) as componentType;

export default SignUp;
