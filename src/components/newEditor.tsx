import {Editor} from '@tinymce/tinymce-react';
import UploadImg from '@/components/uploadImages';
import {useState} from 'react';
import {UseFormRegister, Path, UseFormSetValue} from 'react-hook-form';
import {PageType} from '@/types';

export type ContentProps = {
  label: Path<PageType>;
  register: UseFormRegister<PageType>;
  required: boolean;
  value: string;
  setValue: UseFormSetValue<PageType>;
};
const newEditor = ({label, register, required, value, setValue}: ContentProps) => {
  const [uploadImgShow, setUploadImgShow] = useState(false);
  const handleInit = (editor: any) => {
    editor.ui.registry.addIcon(
      'pclist',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9M19 19H5V5h14z"/></svg>'
    );
    editor.ui.registry.addIcon(
      'titleicon',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 11H6V7H4v10h2v-4h6v4h2V7h-2zm10 0h-2V9h-2v2h-2v2h2v2h2v-2h2z"/></svg>'
    );
    editor.ui.registry.addIcon(
      'relatedicon',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M13 10H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1m0-4H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1M3 16h6c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1m19.21-3.79l.09.09c.39.39.39 1.02 0 1.41l-5.58 5.59a.996.996 0 0 1-1.41 0l-3.09-3.09a.996.996 0 0 1 0-1.41l.09-.09a.996.996 0 0 1 1.41 0l2.3 2.3l4.78-4.79c.38-.4 1.02-.4 1.41-.01"/></svg>'
    );
    editor.ui.registry.addIcon(
      'imgcentericon',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="m12 23l-4-4h8zm8-20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM5 14h14l-4.5-6l-3.5 4.5l-2.5-3z"/></svg>'
    );
    editor.ui.registry.addButton('customUpload', {
      icon: 'image',
      onAction: () => {
        setUploadImgShow((persist) => !persist);
      }
    });
    editor.ui.registry.addButton('list', {
      icon: 'pclist',
      onAction: function () {
        editor.insertContent('<products></products>');
      }
    });

    editor.ui.registry.addButton('h2Class', {
      icon: 'titleicon',
      onAction: () => {
        if (editor.dom.getParent(editor.selection.getNode(), 'h2')) {
          editor.formatter.apply('h2custom');
        } else {
          console.warn('please select h2');
        }
      }
    });
    editor.ui.registry.addButton('relatedClass', {
      icon: 'relatedicon',
      onAction: () => {
        if (editor.dom.getParent(editor.selection.getNode(), 'ul')) {
          editor.formatter.apply('relatedcustom');
        }
      }
    });
    editor.ui.registry.addButton('imgClass', {
      icon: 'imgcentericon',
      onAction: () => {
        editor.insertContent(`<div class="img-center">
                <img src="/images/default.jpg" width="500" height="300" loading="lazy" alt="default" />
                </div>`);
      }
    });
  };
  return (
    <>
      <UploadImg show={uploadImgShow} />
      <textarea {...register(label, {required})} className="hidden" />
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="glp"
        scriptLoading={{async: false}}
        initialValue={value}
        init={{
          min_height: 500,
          width: '100%',
          menubar: false,
          resize: true,
          statusbar: false,
          object_resizing: false,
          valid_elements:
            '*[*],products[*],h1[*],h2[*],h3[*],h4[*],p[*],br,div[*],span[*],a[*],img[*],table[*],tbody,tr,td,th,ul[*],ol[*],li[*],strong,em,i,u,b,strong,',
          extended_valid_elements: 'products',
          custom_elements: 'products',
          default_link_target: '_blank',
          automatic_uploads: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | code | customUpload | list | h2Class | relatedClass | imgClass |' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          formats: {
            alignright: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right'},
            h2custom: {
              selector: 'h2', // 目标标签
              classes: 'new-title' // 要添加的class
            },
            relatedcustom: {
              selector: 'ul', // 目标标签
              classes: 'new-style4 grid-item' // 要添加的class
            }
          },
          setup: handleInit
        }}
        onEditorChange={(content: string) => {
          setValue(label, content);
        }}
      />
    </>
  );
};

export default newEditor;
