import Assets from '@/constants/assets.constant';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

function SplashScreen({ loading = false }: { loading?: boolean }) {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <Image
        src={Assets.closerLogo}
        alt="logo"
        width={200}
        height={200}
        onClick={() => {}}
      />

      {loading && <CircularProgress size={32} thickness={5} />}
    </div>
  );
}

export default SplashScreen;
