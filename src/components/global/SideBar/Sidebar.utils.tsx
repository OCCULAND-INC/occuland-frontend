import {
  CogIcon,
  HomeIcon,
  PencilIcon,
  ShoppingCartIcon,
  XIcon,
} from '@heroicons/react/solid';

export const ROUTES_MAP = [
  {
    href: '/',
    title: 'Home',
    icon: <HomeIcon className="h-5 w-5 text-white-900 mr-2" />,
  },
  {
    href: '/landmarket',
    title: 'Land Market',
    icon: <ShoppingCartIcon className="h-5 w-5 text-white-900 mr-2" />,
  },
  {
    href: '/experience',
    title: 'Experience',
    icon: <PencilIcon className="h-5 w-5 text-white-900 mr-2" />,
  },
  {
    href: '/bridge',
    title: 'Asset Bridge',
    icon: <XIcon className="h-5 w-5 text-white-900 mr-2" />,
  },
  {
    href: '/settings',
    title: 'Settings',
    icon: <CogIcon className="h-5 w-5 text-white-900 mr-2" />,
  },
];
