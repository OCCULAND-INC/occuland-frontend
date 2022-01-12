import { BeakerIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Logo from '~/assets/logo/logo.svg';

import { ROUTES_MAP } from './Sidebar.utils';

function Sidebar() {
  const router = useRouter();

  const handleClickRoute = (href: string) => () => {
    router.push(href);
  };

  return (
    <nav className="bg-white flex flex-col flex-shrink-0 h-screen items-center py-10 px-5 rounded-tr-4xl rounded-br-4xl shadow-2xl">
      <div className="mb-8">
        <Image src={Logo} width={100} height={100} />
      </div>
      <ul className="flex flex-col w-full">
        {ROUTES_MAP.map(({ href, title, icon }, index) => (
          <li
            key={index}
            onClick={handleClickRoute(href)}
            className="flex text-gray-900 hover:text-gray-500 py-4 cursor-pointer items-center"
          >
            {icon}
            <span>{title}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
