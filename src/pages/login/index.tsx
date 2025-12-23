import {useRef, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import ResetPassword from './components/restPassword';
import {componentType, LogTabType} from '@/types';
import {initKey, registerKey, forgetKey} from '@/config';
import {QueryProvider} from '@/providers/queryProvider';

const Component: componentType = ({tabKey, setcurrentKey, handleToggleView}) => {
  const items = new Map<LogTabType, componentType>([
    [
      (initKey as LogTabType) || 'default',
      () => (
        <SignIn className="min-w-96" setcurrentKey={setcurrentKey}>
          <p
            className="text-center text-sm cursor-pointer transition hover:text-opacity-dark"
            onClick={() => setcurrentKey(registerKey)}
          >
            Create an account
          </p>
        </SignIn>
      )
    ],
    [
      registerKey as LogTabType,
      () => (
        <SignUp className="min-w-96" handleToggleView={handleToggleView}>
          <p
            className="text-center text-sm cursor-pointer transition hover:text-opacity-dark"
            onClick={() => setcurrentKey(initKey)}
          >
            Already have an account? Log In
          </p>
        </SignUp>
      )
    ],
    [
      forgetKey as LogTabType,
      () => (
        <ResetPassword className="min-w-96" handleToggleView={handleToggleView}>
          <p
            className="text-center text-sm cursor-pointer transition hover:text-opacity-dark"
            onClick={() => setcurrentKey(initKey)}
          >
            Already have an account? Log In
          </p>
        </ResetPassword>
      )
    ]
  ]);
  return <div>{!!tabKey && items.get(tabKey ?? '')?.(tabKey)}</div>;
};
export default function Login() {
  const [currentKey, setcurrentKey] = useState(initKey),
    containerRef = useRef(null);

  const handleToggleView = (key: LogTabType) => setcurrentKey(key);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-[url(@/assets/images/login-bg-2.jpg)] bg-center bg-cover ">
          <div className="bg-opacity-main overflow-hidden">
            <div className="relative" ref={containerRef}>
              <QueryProvider>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentKey}
                    initial={{opacity: 0, x: currentKey === initKey ? -50 : 50}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: currentKey === initKey ? 50 : -50}}
                    transition={{duration: 0.4, ease: 'easeInOut'}}
                    className="flex inset-x-0 px-8"
                  >
                    <Component tabKey={currentKey} setcurrentKey={setcurrentKey} handleToggleView={handleToggleView} />
                  </motion.div>
                </AnimatePresence>
              </QueryProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
