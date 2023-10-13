/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../store';

interface IAuthRedirect {
  watch?: boolean;
}

const useAuthRedirect = ({ watch = false }: IAuthRedirect = {}) => {
  const navigate = useRouter();
  const isAuth = useAppSelector((store) => store.profile.accessToken);
  const deps = [watch ? isAuth : null];

  useEffect(() => {
    if (isAuth) navigate.replace('/dashboard');
  }, deps);

  return isAuth;
};

export default useAuthRedirect;
