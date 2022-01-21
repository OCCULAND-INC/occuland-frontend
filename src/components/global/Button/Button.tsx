import { ReactNode } from 'react';

import { THEME } from '~/lib/constants/theme';

interface Props {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  theme?: THEME;
}

const baseStyle =
  'h-9 py-2 px-4 text-sm font-medium rounded-lg border focus:z-10 focus:ring-2';

const styles = {
  [THEME.LIGHT]:
    'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700',
  [THEME.DARK]:
    'text-white bg-gray-800 text-gray-400 border-gray-600 hover:text-gray-200 hover:bg-gray-700',
};

function Button({
  children,
  className,
  onClick,
  disabled,
  theme = THEME.DARK,
  ...rest
}: Props) {
  const buttonStyle = `${baseStyle} ${styles[theme]} ${className}`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonStyle}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
