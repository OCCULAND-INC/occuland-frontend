import { BeakerIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { ROUTES_MAP } from './Sidebar.utils';

function Sidebar() {
  const router = useRouter();

  const handleClickRoute = (href: string) => () => {
    router.push(href);
  };

  return (
    <nav className="bg-white flex flex-col h-screen items-center py-8 px-2 rounded-tr-4xl rounded-br-4xl shadow-2xl">
      <div className="mb-8">
        <BeakerIcon className="h-6 w-6 text-gray-800" />
      </div>
      <ul className="flex flex-col w-full">
        {ROUTES_MAP.map(({ href, title, icon }, index) => (
          <li
            key={index}
            onClick={handleClickRoute(href)}
            className="flex text-gray-400 hover:text-gray-800 py-4 cursor-pointer items-center"
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