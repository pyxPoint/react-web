import useUserStore from '@/store/user';
import {useMessageStore} from '@/store/message';
import {
  GetFileApi,
  PageType,
  RenderScriptType,
  SearchParamsType,
  SocketImageType,
  MenuType,
  MenusContentType
} from '@/types';
import {SearchParamsValue, OperateCode, websocketUrl} from '@/config';
import {Fetch, fetchAll, FetchTest} from '@/utils';

export const getMenuList = async (params: SearchParamsType | null) => {
  const tempParams: Record<string, any> = {...params};
  let temp = new URLSearchParams();
  !!params &&
    [...Object.keys(params)].forEach((key) => {
      temp.append(SearchParamsValue.get(key) ?? key, tempParams[key]);
    });
  return FetchTest<MenuType>({
    url: `api/getMenuList${!!params ? `?${temp}` : ''}`,
    method: 'GET',
    isToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
export const getMenuListContent = async () => {
  return FetchTest<Array<MenusContentType>>({
    url: `api/getMenuListContent`,
    method: 'GET',
    isToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getMenu = async (id: number) =>
  FetchTest({
    url: `/api/getMenu?id=${id}`,
    method: 'GET',
    isToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
export const sendMenuData = async (data: MenuType, operateType: string) =>
  FetchTest({
    url: `/api/menu`,
    method: OperateCode[operateType],
    isToken: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
export const deleteMenu = async (id: number, operateType: string) =>
  FetchTest({
    url: `/api/menu?id=${id}`,
    method: OperateCode[operateType],
    isToken: true
  });
export const UploadImgs = async (accessToken: string, dataForm: FormData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_MAIN_URL ? import.meta.env.VITE_MAIN_URL : '/main/api'}/blogs/images`,
      {
        method: 'POST',
        headers: {
          //"Content-Type": "multipart/form-data",
          Authorization: `bearer ${accessToken}`
        },
        body: dataForm
      }
    );
    const {ok, status, statusText} = res;
    if (status === 401) useUserStore.getState().regainingPermissions();
    if (!ok) {
      useMessageStore.getState().setMessage(res.ok ? 'success' : 'error', res.statusText, Date.now().toString());
      //useUserStore.getState().signOut();
      throw new Error(statusText);
    }
    const data: any = await res.json();
    return {isSuccess: ok, data};
  } catch (error) {
    return {isSuccess: false, errors: error};
    //return error;
  }
};

export const Uploadfiles = async (accessToken: string, data: FormData, baseUrl: string) => {
  try {
    const res = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        //"Content-Type": "multipart/form-data",
        Authorization: `bearer ${accessToken}`
      },
      body: data
    });
    const {ok, status, statusText} = res;
    useMessageStore.getState().setMessage(res.ok ? 'success' : 'error', statusText, Date.now().toString());
    if (status === 401) useUserStore.getState().regainingPermissions();
    return {isSuccess: ok};
  } catch (error) {
    return {isSuccess: false, errors: error};
    //return error;
  }
};

export const getServicesList = async (params: SearchParamsType | null) => {
  const tempParams: Record<string, any> = {...params};
  let temp = new URLSearchParams();
  !!params &&
    [...Object.keys(params)].forEach((key) => {
      temp.append(SearchParamsValue.get(key) ?? key, tempParams[key]);
    });
  return FetchTest<PageType>({
    url: `api/getPageList${!!params ? `?${temp}` : ''}`,
    method: 'GET',
    isToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getPage = async (id: number) =>
  FetchTest({
    url: `/api/getPage?id=${id}`,
    method: 'GET',
    isToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
export const sendPageData = async (data: PageType, operateType: string) =>
  FetchTest({
    url: `/api/page`,
    method: OperateCode[operateType],
    isToken: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
export const deletePage = async (id: number, operateType: string) =>
  FetchTest({
    url: `/api/page?id=${id}`,
    method: OperateCode[operateType],
    isToken: true
  });
export const getStaticFile: GetFileApi = async (urls: string[]) => {
  const {isSuccess, data, message} = await fetchAll(urls, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${useUserStore.getState().userInfo?.token}`
    }
  });
  if (!isSuccess || !Array.isArray(data)) return {isSuccess: false, data: [], message}; //return useMessageStore.getState().setMessage("error", message as string, Date.now().toString());
  return {isSuccess: true, data, message};
};
export const getPdf = async (url: string) => {
  try {
    const res = await fetch(`/api${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${useUserStore.getState().userInfo?.token}`
      }
    });
    const {ok, status} = res;
    if (status === 401) useUserStore.getState().regainingPermissions();
    const {data, code, msg} = await res.json();
    return code === 200 ? {isSuccess: ok, data, message: msg} : {isSuccess: false, data: null, message: msg};
  } catch (error: any) {
    console.log(error.message);
    return {isSuccess: false, data: null, message: error?.message};
  }
};
export const renderScript: RenderScriptType = async (formData: any) =>
  Fetch({
    url: '/api/script/run',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${useUserStore.getState().userInfo?.token}`
    },
    body: JSON.stringify(formData)
  });

export const ItWebSocket = (
  url: string,
  {images, ...rest}: SocketImageType,
  updateProgressBar: (progress: number) => void,
  setValue: (name: string) => void
) => {
  const token = useUserStore.getState().userInfo?.token ?? '',
    socket = new WebSocket(`${websocketUrl}${url}`, [token]);
  socket.onopen = () => {
    sendLargeImage(new Uint8Array(images as ArrayBuffer), rest);
  };

  socket.onmessage = (event) => {
    const {status, progress, message} = JSON.parse(event.data);
    if (status === 'progress') !!progress && updateProgressBar(progress);
    if (status === 'success') UploadSuccess(message);
    if (status === 'error') useMessageStore.getState().setMessage('error', message, Date.now().toString());
    if (status === 'success' || status === 'error') socket.close();
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
  function UploadSuccess(message: string) {
    useMessageStore.getState().setMessage('success', message, Date.now().toString());
    setValue(rest.fileName);
  }
  function sendLargeImage(imageData: ArrayBuffer, otherParams: Omit<SocketImageType, 'images'>, chunkSize = 8192) {
    const totalChunks = Math.ceil(imageData.byteLength / chunkSize);
    for (let i = 0; i < totalChunks; i++) {
      const chunk: ArrayBuffer = imageData.slice(i * chunkSize, (i + 1) * chunkSize);
      const message = {
        type: 'IMAGE_CHUNK',
        chunkIndex: i,
        totalChunks: totalChunks,
        data: {...otherParams, img: Array.from(new Uint8Array(chunk))}
      };
      socket.send(JSON.stringify(message));
    }
  }
  return socket;
};
