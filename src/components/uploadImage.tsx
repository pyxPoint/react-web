import {componentType, SocketImageType} from '@/types';
import {ItWebSocket} from '@/services';
import {Progress} from '@heroui/react';
import {cloneElement, isValidElement, useEffect, useRef, useState} from 'react';

interface ButtonProps {
  onClick?: React.MouseEventHandler;
}
const ItProgress: componentType = ({data, setValue}) => {
  if (!data) return <></>;
  console.log('ItProgress');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    ItWebSocket('/wsImage', data, setProgress, setValue);
  }, [data]);
  return (
    <Progress
      classNames={{
        base: 'max-w-md',
        track: 'drop-shadow-md border border-default',
        indicator: 'bg-linear-to-r from-pink-500 to-yellow-500',
        label: 'tracking-wider font-medium text-default-600',
        value: 'text-foreground/60'
      }}
      label="Lose weight"
      radius="sm"
      showValueLabel={true}
      size="sm"
      value={progress}
    />
  );
};
const UploadImg: componentType = ({children, setValue}) => {
  const [imgData, setImgData] = useState<SocketImageType | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const handleUploadImg = (img: File | null) => {
    if (!img) return;
    const reader = new FileReader();
    reader.onload = (event) =>
      !!event.target?.result &&
      setImgData({
        images: event.target.result as ArrayBuffer,
        fileName: img.name,
        mimeType: img.type,
        format: 'buffer'
      });
    reader.readAsArrayBuffer(img);
  };

  return (
    <>
      <input
        ref={input}
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleUploadImg(event?.target?.files?.[0] ?? null);
        }}
        className="hidden"
        accept=".jpg,.png"
      />
      {isValidElement(children) &&
        cloneElement(children as React.ReactElement<ButtonProps>, {
          onClick: () => input.current?.click()
        })}
      <ItProgress data={imgData} setValue={setValue} />
    </>
  );
};
export default UploadImg;
