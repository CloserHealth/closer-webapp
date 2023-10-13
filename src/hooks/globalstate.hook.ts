import { useAppSelector } from '@/store';
import { ProfileState } from '@/store/profile.slice';


interface IGlobalState {
  profile: ProfileState;
  isAuthenticated: boolean;
}

const useGlobalState = (): IGlobalState => {
  const profile = useAppSelector((state: { profile: any; }) => state.profile) as ProfileState;
  const isAuthenticated = !!profile?.accessToken;

  return { profile, isAuthenticated };
};

export default useGlobalState;
