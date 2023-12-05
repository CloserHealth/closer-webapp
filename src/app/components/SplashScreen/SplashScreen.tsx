import Assets from '@/constants/assets.constant';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { FadeInFromRight } from '../Transitions/Transitions';

function SplashScreen({ loading = false }: { loading?: boolean }) {
  return (
    <div className="w-full h-[100vh] min-h-[100svh] flex flex-col items-center justify-center bg-white">
      <FadeInFromRight>
        <Image
          src={Assets.closerLogo}
          alt="logo"
          width={200}
          height={200}
        />
      </FadeInFromRight>

      {loading && <CircularProgress size={32} thickness={5} />}
    </div>
  );
}

export default SplashScreen;
