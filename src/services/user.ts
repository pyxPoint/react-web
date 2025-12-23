import {Info, IFormLogup, IFormResetPassword, IFormLogResetPassword, IFormLogin, UserType} from '@/types';
import {Fetch, FetchTest} from '@/utils';

export const register = async (formData: IFormLogup) =>
  FetchTest<UserType>({
    url: '/api/user/register',
    method: 'POST',
    isToken: false,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
export const login = async (user: IFormLogin) =>
  Fetch({
    url: '/api/user/login',
    method: 'POST',
    isToken: false,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
export const updateToken = async (userInfo: Info | null) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_MAIN_URL ? import.meta.env.VITE_MAIN_URL : '/main/api'}/identity/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      }
    );
    const {ok, statusText} = res;
    if (!ok) {
      throw new Error(statusText);
    }
    return res.json();
  } catch (error) {
    return error;
  }
};

export const getUsers = async (accessToken: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_MAIN_URL ? import.meta.env.VITE_MAIN_URL : '/main/api'}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const {ok, statusText} = res;
    if (!ok) {
      throw new Error(statusText);
    }
    return res.json();
  } catch (error) {
    return error;
  }
};

export const restPassword = async (formData: IFormResetPassword): Promise<any> =>
  Fetch({
    url: '/api/user/edit-profile-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

export const logResetPassword = async (formData: IFormLogResetPassword) =>
  Fetch({
    url: '/api/user/reset-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
export const sendCode = async (formData: {email: string}) =>
  Fetch({
    url: '/api/user/send-reset-code',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
