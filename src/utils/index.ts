import {FetchParams, FetchType, FetchTestType} from '@/types';
import tryCatch from 'await-to-js';
import useUserStore from '@/store/user';
import {useMessageStore} from '@/store/message';
export async function fetchAll(urls: string[], options = {}) {
  try {
    const responses = await Promise.all(urls.map((url) => fetch(`/api${url}`, options)));
    const errors = responses.filter((r) => !r.ok);
    if (errors.length > 0) {
      throw new Error(`Failed to fetch ${errors.length} resources`);
    }
    return {isSuccess: true, data: await Promise.all(responses.map((r) => r.text())), message: 'Success'};
  } catch (error: any) {
    console.error('Batch fetch error:', error?.message);
    return {isSuccess: false, data: [], message: error?.message || 'Failed to fetch resources'};
  }
}
export const Fetch: FetchType = async ({url, method, isToken = true, headers, body}) => {
  const [error, res] = await tryCatch(
    fetch(url, {
      method: method,
      headers: {
        Authorization: isToken ? `bearer ${useUserStore.getState().userInfo?.token}` : '',
        ...headers
      },
      body
    })
  );
  if (error) return {isSuccess: false, errors: error.message};
  const {ok, status} = res;
  if (status === 401) useUserStore.getState().signOut();
  const [reserror, {message, data}] = await tryCatch(res?.json());
  if (reserror) return {isSuccess: false, errors: reserror.message};
  if (!ok) return {isSuccess: false, errors: message};
  return {isSuccess: true, data};
};

export const FetchTest: FetchTestType = async <T>({
  url,
  method,
  isToken = true,
  headers,
  body,
  toast = false
}: FetchParams): Promise<T | void> => {
  const [error, res] = await tryCatch(
    fetch(url, {
      method: method,
      headers: {
        Authorization: isToken ? `bearer ${useUserStore.getState().userInfo?.token}` : '',
        ...headers
      },
      body
    })
  );
  if (error) throw new Error(error?.message);
  const {ok, statusText, status} = res;
  if (status === 401) useUserStore.getState().signOut();
  const [reserror, bkmsg] = await tryCatch(res?.json());
  if (toast)
    return useMessageStore.getState().setMessage('error', reserror || bkmsg?.msg || statusText, Date.now().toString());
  if (reserror) throw new Error(reserror.message);
  if (!ok) throw new Error(bkmsg?.msg || statusText);
  return bkmsg; //code === 200 ? {isSuccess: true, data} : {isSuccess: false, errors: data?.error || msg};
};
