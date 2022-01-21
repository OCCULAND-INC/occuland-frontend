import { ReplyIcon } from '@heroicons/react/solid';
import Image from 'next/image';

interface Props {
  className?: string;
  imageUrl: string;
  onClick: () => void;
  subtitle: string;
  title: string;
}

function Card({ imageUrl, title, subtitle, className, onClick }: Props) {
  const containerCls =
    'max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700';

  return (
    <div className={`${containerCls} ${className || ''}`} onClick={onClick}>
      <div className="w-full">
        <Image
          className="rounded-t-lg"
          src={imageUrl}
          alt="Product Image"
          height={300}
          width={400}
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between">
          <p>Daily Price</p>
          <p className="mb-3 font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Purchase</p>
          <p className="mb-3 font-bold tracking-tight text-gray-900 dark:text-white">
            {subtitle}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <ReplyIcon className="h-5 w-5 text-gray-900 mr-2" />
        </div>
      </div>
    </div>
  );
}

export default Card;
