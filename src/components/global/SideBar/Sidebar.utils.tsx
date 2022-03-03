import {
  CogIcon,
  LibraryIcon,
  MapIcon,
  PuzzleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/solid';

export const ROUTES_MAP = [
  {
    href: '/',
    title: 'Explore Land',
    icon: <MapIcon className="h-5 w-5 mr-2" style={{ color: '#9d5feb' }} />,
  },
  {
    href: '/auction',
    title: 'Land Auctions',
    icon: <LibraryIcon className="h-5 w-5 mr-2" style={{ color: '#9d5feb' }} />,
  },
  {
    href: '/landmarket',
    title: 'Rent Land',
    icon: (
      <ShoppingBagIcon className="h-5 w-5 mr-2" style={{ color: '#9d5feb' }} />
    ),
  },
  {
    href: '/experiences',
    title: 'Experiences',
    icon: <PuzzleIcon className="h-5 w-5 mr-2" style={{ color: '#9d5feb' }} />,
  },
  {
    href: '/profile',
    title: 'Profile',
    icon: <CogIcon className="h-5 w-5 mr-2" style={{ color: '#9d5feb' }} />,
  },
];
