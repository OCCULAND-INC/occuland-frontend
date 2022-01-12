import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';

import { randomString } from '~/lib/utils/string';

import { AlertType, styles } from './Alert.types';

interface Props {
  className?: string;
  id?: string;
  text: string;
  type: AlertType;
}

function Alert({ id, type, text, className = '' }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  const elementId = id ? id : `${randomString(10)}-alert`;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id={elementId}
      className={`flex p-4 mb-4 ${styles[type].container} ${className}`}
      role="alert"
    >
      <div className={`ml-3 text-sm font-medium ${styles[type].text}`}>
        {text}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 ${styles[type].button}`}
        aria-label="Close"
        onClick={handleDismiss}
      >
        <span className="sr-only">Close</span>
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Alert;
