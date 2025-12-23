import {Input} from '@heroui/react';
import {componentType} from '@/types';
import {IoSearchSharp} from 'react-icons/io5';
import {debounce} from 'lodash';

const Search: componentType = ({className, classNames, lable, setKeyWords, defaultValue}) => {
  const onSubmit = (keyWords: string) => {
    debounce(setKeyWords(keyWords), 300)?.();
  };
  return (
    <>
      <Input
        label={lable}
        className={`mb-4 w-1/2 ${!!className ? className : ''}`}
        classNames={{inputWrapper: 'bg-white', ...classNames}}
        type="search"
        defaultValue={defaultValue}
        color="warning"
        placeholder="Search..."
        onChange={(e) => onSubmit(e.target.value)}
        onKeyDown={(e) => e.code === 'Enter' && onSubmit((e.target as HTMLInputElement)?.value)}
        endContent={<IoSearchSharp />}
      />
    </>
  );
};

export default Search;
