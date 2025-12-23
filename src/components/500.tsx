import {Image} from '@heroui/react';
import img from '@/assets/images/neterror.jpg';

const Code500 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[90%] bg-white rounded-xl">
      <Image src={img} alt="Error 500" width={360} height={360} className=" mb-4 object-cover" />
    </div>
  );
};

export default Code500;
