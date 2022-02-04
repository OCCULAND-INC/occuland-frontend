import { useAppDispatch, useAppSelector } from '~/hooks/redux-hook';
import { removeToast } from '~/state/app/actions';

import { AlertType } from '../Alert/Alert.types';
import Toast from './Toast';

function ToastContainer() {
  const { toasts } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  if (!toasts) {
    return null;
  }

  const handleClose = (id: string) => {
    dispatch(removeToast({ id }));
  };

  return (
    <div className="absolute right-5 bottom-5">
      {toasts.map((toast, index) => (
        <Toast
          key={`global-toast-${index}`}
          text={toast.text ?? ''}
          icon={toast.icon}
          type={toast.type || AlertType.NORMAL}
          onClose={handleClose}
        />
      ))}
    </div>
  );
}

export default ToastContainer;
