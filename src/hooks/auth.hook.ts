import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../store';

interface IPAuth {
  watch?: boolean;
}

const useAuth = ({ watch = false }: IPAuth = {}) => {
  const navigate = useRouter();
  const isAuth = useAppSelector((store) => store.profile.accessToken) as boolean;
  const deps = [watch ? isAuth : null];

  useEffect(() => {
    if (!isAuth) navigate.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return isAuth;
};

export default useAuth;
