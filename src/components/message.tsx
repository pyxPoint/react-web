import {useMessageStore} from '@/store/message';
import {addToast} from '@heroui/toast';
import {ToastProvider} from '@heroui/toast';
import {useEffect} from 'react';

const Message = () => {
  const {type, content, key} = useMessageStore();
  useEffect(() => {
    !!key &&
      addToast({
        description: content,
        // @ts-ignore
        variant: 'flat',
        size: 'sm',
        color: type === 'success' ? 'success' : 'danger'
      });
  }, [key]);
  return (
    <div className="z-50">
      <ToastProvider placement={'top-right'} />
    </div>
  );
};

export default Message;
