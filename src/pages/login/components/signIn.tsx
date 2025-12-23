import {Button, Input, Checkbox, Form} from '@heroui/react';
import {memo, useState} from 'react';
import {IoEyeSharp, IoEyeOffSharp} from 'react-icons/io5';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import useLoginStore from '@/store/user';
import {componentType, IFormLogin} from '@/types';
import {useMessageStore} from '@/store/message';
import {forgetKey} from '@/config';
import {useMutation} from '@tanstack/react-query';
import tryCatch from 'await-to-js';

const SignIn: componentType = memo(({className, children, setcurrentKey}) => {
  const {signIn, user} = useLoginStore();
  const [isVisible, setIsVisible] = useState(false),
    [remember, setRemember] = useState(user?.rememberMe || false),
    [isloading, setIsLoading] = useState(false),
    {setMessage} = useMessageStore(),
    {
      register,
      handleSubmit,
      formState: {errors}
    } = useForm<IFormLogin>(),
    navigate = useNavigate();
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const mutation = useMutation({
    mutationFn: signIn
  });
  const onSubmit: SubmitHandler<IFormLogin> = async (formData) => {
    setIsLoading(true);
    const [error] = await tryCatch(mutation.mutateAsync(formData));
    setIsLoading(false);
    if (error) return setMessage('fail', error.message as string, Date.now().toString());
    setMessage('success', 'Login success', Date.now().toString());
    navigate('/', {replace: true});
  };
  const rememberHandler = (remember: boolean) => {
    setRemember(remember);
  };
  return (
    <div className={className}>
      <Form className="w-96 px-10 pt-10 pb-16 grid gap-8 items-center" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-4xl font-bold text-white font-CALISTB m-auto">SING IN</p>
        <Input
          type="text"
          label="Email"
          isRequired
          radius="full"
          className="!outline-hidden"
          classNames={{inputWrapper: 'bg-opacity-white-50 backdrop-blur-sm'}}
          defaultValue={user?.email}
          isInvalid={!!errors.email}
          errorMessage="Please enter a valid email"
          {...register('email', {required: true})}
        />
        <Input
          label="Password"
          radius="full"
          isRequired
          classNames={{inputWrapper: 'bg-opacity-white-50 backdrop-blur-sm'}}
          {...register('password', {required: true})}
          defaultValue={user?.password}
          isInvalid={!!errors.password}
          errorMessage="Please enter a valid password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? <IoEyeOffSharp color="main" /> : <IoEyeSharp color="main" />}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          className="max-w-xs"
        />
        <div className="flex justify-between">
          <Checkbox
            size="sm"
            color="primary"
            isSelected={remember}
            onValueChange={rememberHandler}
            radius="full"
            classNames={{icon: 'text-white'}}
            {...register('rememberMe')}
          >
            <label className="text-white">Remember me</label>
          </Checkbox>
          <Button
            size="sm"
            className="text-white"
            radius="full"
            variant="light"
            onPress={() => setcurrentKey(forgetKey)}
          >
            Forgot password?
          </Button>
        </div>

        <Button
          radius="full"
          variant="solid"
          size="lg"
          color="primary"
          className="w-full bg-main text-white py-7"
          type="submit"
          isLoading={isloading}
        >
          SING IN
        </Button>
        {children}
      </Form>
    </div>
  );
}) as componentType;

export default SignIn;
