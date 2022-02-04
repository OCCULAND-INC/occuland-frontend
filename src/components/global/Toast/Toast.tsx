import { XIcon } from '@heroicons/react/solid';
import { ReactNode, useState } from 'react';

import { AlertProps } from '~/components/global/Alert/Alert';
import { randomString } from '~/lib/utils/string';

export interface ToastProps extends AlertProps {
  icon?: ReactNode;
  onClose?: (id: string) => void;
}

function Toast({ id, text, className = '', icon, onClose }: ToastProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const elementId = id ? id : `${randomString(10)}-alert`;

  const handleDismiss = () => {
    setIsOpen(false);
    onClose && onClose(elementId);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id={elementId}
      className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${className}`}
      role="alert"
    >
      {icon && (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          {icon}
        </div>
      )}
      <div className="ml-3 text-sm font-normal">{text}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        onClick={handleDismiss}
      >
        <span className="sr-only">Close</span>
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Toast;
