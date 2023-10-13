import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { store, useAppSelector } from '../store';
import { ProfileState, profileLoginAction, profileLogoutAction, profileUpdateAction } from '../store/profile.slice';
import API, { API_HOST } from '@/constants/api.constant';


interface IRequestState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: AxiosError<T>;
  data?: T;
}

interface IRequestConfig extends AxiosRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

const useRequest = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { accessToken: token, refreshToken: refresh } = useAppSelector((state) => state.profile) as ProfileState;

  const [source] = useState(axios.CancelToken.source());

  const [requestState, setRequestState] = useState<IRequestState<any>>({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(
    () => () => {
      requestState.isLoading && source.cancel('This was cancelled!');
    },
    []
  );

  const logout = () => {
    dispatch(profileLogoutAction());
    window.location.reload();
  };

  const makeRequest = useCallback(
    async (config: IRequestConfig) => {
      setRequestState({ isLoading: true, isSuccess: false, isError: false });

      const axiosInstance = axios.create({
        baseURL: API_HOST,
        cancelToken: source.token,
      });

      const promise = new Promise<AxiosResponse | AxiosError>((res, rej) => {
        const refreshUser = async () => {
          try {
            const resolve = await axiosInstance.request({
              method: 'POST',
              url: API.verify,
              headers: {
                Authorization: `Bearer ${refresh}`,
              },
            });
            const { data }: any = resolve.data;
            const user = {
              ...data.user,
              accessToken: data.access,
              refreshToken: data.refresh,
            };
            dispatch(profileLoginAction(user));
            // retryRequest(config, user);
            window.location.reload();
          } catch (e) {
            dispatch(profileLogoutAction());
          }
        };

        const rejectErr = (error: AxiosError | any) => {
          setRequestState({
            isLoading: false,
            isSuccess: false,
            isError: true,
            error,
          });
          rej(error);
        };

        const retryRequest = (config: IRequestConfig, user: { accessToken: string; refreshToken: string }) => {
          axiosInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
          axiosInstance
            .request(config)
            .then((response) => {
              setRequestState({
                isLoading: false,
                isSuccess: true,
                isError: false,
                data: response.data,
              });
              res(response);
            })
            .catch((err) => {
              rej(err);
            });
        };

        // eslint-disable-next-line consistent-return
        const request = async () => {
          try {
            const { accessToken: token, refreshToken: refresh } = store.getState().profile;
            axiosInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
            const response: AxiosResponse<any> = await axiosInstance.request(config);
            setRequestState({
              isLoading: false,
              isSuccess: true,
              isError: false,
              data: response.data,
            });

            res(response);
          } catch (error: AxiosError | any) {
            const { code } = error;
            const networkErrorCodes = ['ERR_CONNECTION_REFUSED', 'ERR_NETWORK'];
            // global error
            if (networkErrorCodes.includes(code))

            if (!axios.isCancel(error)) {
              // reject returns catch
              if (!token) return rejectErr(error);

              // Authentication Checker...
              const authTokenErrors = [401, 403];
              const data = error.response;
              if (authTokenErrors.includes(error.response) && data?.message === 'jwt expired') {
                // Intercept the request and then refresh the user...
                // await refreshUser();
                logout();
              } else if (authTokenErrors.includes(error.response) && data?.message === 'invalid signature') {
                logout();
              } else {
                rejectErr(error);
              }
            }
          }
        };

        request();
      });

      return promise as unknown as Promise<AxiosResponse>;
    },
    [navigate, source]
  );

  return { makeRequest, ...requestState };
};

export default useRequest;
