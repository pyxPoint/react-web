import {Image as HeroImage, Skeleton} from '@heroui/react';
import {componentType} from '@/types';
import {useEffect, useState} from 'react';

interface ImgLoadProps {
  src: string;
  setImgSrc: (src: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}
const ImgLoad = ({src, setImgSrc, setIsLoading}: ImgLoadProps) => {
  const img: HTMLImageElement = new Image(500, 500);
  img.src = src;
  img.onload = () => {
    setImgSrc(src);
    setIsLoading(true);
  };
};
const ImageView: componentType = ({src = '', className, classNames, ...rest}) => {
  const [imgSrc, setImgSrc] = useState(!!src ? `/api${src}?v=${Date.now()}` : '/src/assets/images/empty.png'),
    [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ImgLoad({src: imgSrc, setImgSrc, setIsLoading});
  }, [src]);
  return (
    <>
      <Skeleton className="w-full rounded-lg" isLoaded={isLoading}>
        {!!src ? (
          <HeroImage className={`${className}`} classNames={{...classNames}} src={imgSrc} {...rest} />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <img src={imgSrc} alt="img" />
          </div>
        )}
      </Skeleton>
    </>
  );
};

export default ImageView;
