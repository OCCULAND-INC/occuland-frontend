import Image from 'next/image';
import { useRouter } from 'next/router';

import Logo from '~/assets/logo/logo.svg';

import { ROUTES_MAP } from './Sidebar.utils';

function Sidebar() {
  const router = useRouter();

  const handleClickRoute = (href: string) => () => {
    router.push(href);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <nav
      className=" xs:hidden sm:flex sm:flex-col sm:flex-shrink-0 sm:h-screen sm:items-center sm:py-10 sm:px-5 sm:rounded-tr-4xl sm:rounded-br-4xl sm:shadow-2xl sm:drop-shadow-2xl"
      style={{
        fontFamily: 'roboto',
        fontWeight: '500',
        backgroundColor: '#141414',
      }}
    >
      <div className="mb-8 cursor-pointer">
        <Image src={Logo} width={120} height={120} onClick={handleLogoClick} />
      </div>
      <ul className="flex flex-col w-full">
        {ROUTES_MAP.map(({ href, title, icon }, index) => (
          <li
            key={index}
            onClick={handleClickRoute(href)}
            className="flex text-gray-100 hover:text-gray-500 py-4 cursor-pointer items-center"
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
