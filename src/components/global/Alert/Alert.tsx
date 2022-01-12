import { LockClosedIcon } from '@heroicons/react/solid';

import { randomString } from '~/lib/utils/string';

import { AlertType, styles } from './Alert.types';

interface Props {
  className?: string;
  id?: string;
  text: string;
  type: AlertType;
}

function Alert({ id, type, text, className = '' }: Props) {
  const elementId = id ? id : `${randomString(10)}-alert`;

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
      >
        <span className="sr-only">Close</span>
        <LockClosedIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Alert;
