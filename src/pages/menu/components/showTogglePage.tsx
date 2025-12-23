import {MyModal} from '@/components/modal';
import {dataCode} from '@/config';
import useMenuStore from '@/store/menu';
import {startTransition} from 'react';
import {useNavigate} from 'react-router-dom';
import useServicesStore from '@/store/services';
import {componentType} from '@/types';

export const ShowTogglePage: componentType = ({show}) => {
  const {list, add} = dataCode,
    {recordEditStatus} = useMenuStore(),
    {recordEditPageStatus} = useServicesStore();
  const navigate = useNavigate();
  function handleBack() {
    recordEditStatus(list);
  }
  return (
    <>
      <MyModal
        title="Create Page"
        btnText="Create"
        show={show}
        className="absolute !opacity-0 z-0 top-0"
        style={{left: '-9999px'}}
        closeHandle={handleBack}
        actionHandle={() => {
          startTransition(() => {
            navigate('/services');
            recordEditPageStatus(add);
          });
        }}
      >
        Begin to create page ?
      </MyModal>
    </>
  );
};
