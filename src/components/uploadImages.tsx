import {Button, Input, Modal, ModalContent, ModalFooter, ModalHeader, ModalBody, Image} from '@heroui/react';
import {useEffect, useRef, useState} from 'react';
import picCover from '@/assets/images/image.png';
import {IoCheckmarkSharp, IoTrashOutline} from 'react-icons/io5';

const UploadImg = ({show}: {show: boolean}) => {
  const formData = useRef<FormData>(new FormData());
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(show),
    [load, setLoad] = useState(false),
    [imgLoading, setImgLoading] = useState(false),
    [isLoad, setIsLoad] = useState(false),
    [images, setImages] = useState<any[]>([]);
  function handleOpenInput() {
    fileInput && fileInput.current?.click();
  }
  const handleImageChange: any = (event: MouseEvent) => {
    const files = Array.from((event?.target as HTMLInputElement)?.files ?? []);
    files.forEach((file: any) => formData.current.set(file.name, file));

    const imageUrls = files.map((file: any) => URL.createObjectURL(file));
    setImages((prevImages) => prevImages.concat(imageUrls));
    return;
  };
  function deleteImg(imgNumber: number) {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(imgNumber, 1);
      return updatedImages;
    });
  }
  async function handleUpload() {
    // TODO: 上传图片
    setImgLoading(true);
    // const {isSuccess} = await UploadImgs(userInfo?.accessToken ?? '', formData.current);
    setIsLoad(true);
    setImgLoading(false);
  }
  useEffect(() => {
    load && setIsOpen(true);
    !load && setLoad(true);
  }, [show]);
  return (
    <>
      <Modal
        backdrop="blur"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut'
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn'
              }
            }
          }
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload pictures</ModalHeader>
              <ModalBody>
                <div className="border border-border-color rounded-lg p-4 max-h-[50vh] overflow-y-auto">
                  <div
                    className={`w-full h-full flex flex-col justify-center ${images.length > 0 ? 'hidden' : ''} items-center`}
                  >
                    <Image width={160} height={160} src={picCover} alt="upload" className="object-contain" />
                    <Input
                      ref={fileInput}
                      type="file"
                      className="w-max"
                      onChange={handleImageChange}
                      multiple
                      accept=".png,.jpg"
                    />
                  </div>
                  <div className={`grid grid-cols-5 gap-4 p-4 ${images.length > 0 ? '' : 'hidden'}`}>
                    {images.map((image, index) => (
                      <div className="relative overflow-hidden rounded-lg group" key={index}>
                        <div
                          className="absolute left-0 top-0  w-full h-full flex
                                                 justify-center items-center z-50 cursor-pointer bg-opacity-dark duration-300
                                                 text-white transition-all translate-y-full group-hover:translate-y-0"
                          onClick={deleteImg.bind(this, index)}
                        >
                          <IoTrashOutline className="text-xl" />
                        </div>
                        <Image
                          width={160}
                          src={image}
                          alt={`preview ${index}`}
                          className="object-cover aspect-square w-auto"
                        />
                        <div
                          className={`bg-green absolute right-0 bottom-0 z-50 w-10 aspect-square flex justify-end ${isLoad ? 'block' : 'hidden'}`}
                          style={{clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)'}}
                        >
                          <IoCheckmarkSharp className="text-white translate-x-[-10%] translate-y-full" />
                        </div>
                      </div>
                    ))}
                    <div className="w-auto aspect-square flex justify-center items-center border border-border-color rounded-lg">
                      <Image
                        width={120}
                        height={120}
                        src={picCover}
                        alt="upload"
                        className="object-contain cursor-pointer"
                        onClick={handleOpenInput}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" size="sm" isLoading={imgLoading} className="text-white" onPress={handleUpload}>
                  Start Uploading
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadImg;
