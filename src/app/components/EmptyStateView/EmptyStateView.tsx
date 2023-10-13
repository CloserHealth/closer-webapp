import { SlideFadeUp } from '@/app/components/Transitions/Transitions';
import Image from 'next/image';

function EmptyStateView({
  icon,
  title,
  subtitle,
  actions,
}: {
  icon: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode | any;
}) {
  return (
    <SlideFadeUp>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Image src={icon} alt="no_results_found" width={250} height={250} />

        {title && <p className="mt-5 sm:text-[1.1vw] text-[4vw] font-bold">{title}</p>}
        {subtitle && (
          <span className="mt-2 sm:text-sm text-[3.7vw] font-medium text-center sm:w-[380px] w-full px-7 text-lightText5 mb-3">
            {subtitle}
          </span>
        )}
        <div className="mt-7 w-[15vw] mx-auto">
          {actions}
        </div>
      </div>
    </SlideFadeUp>
  );
}

export default EmptyStateView;
