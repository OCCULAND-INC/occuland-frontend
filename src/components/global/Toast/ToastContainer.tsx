import { useAppDispatch, useAppSelector } from '~/hooks/redux-hook';
import { updateToast } from '~/state/app/actions';

import { AlertType } from '../Alert/Alert.types';
import Toast from './Toast';

function ToastContainer() {
  const { toast } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  if (!toast) {
    return null;
  }

  const handleClose = () => {
    dispatch(updateToast(null));
  };

  return (
    <div className="absolute right-5 bottom-5">
      <Toast
        id="global-toast"
        text={toast.text ?? ''}
        icon={toast.icon}
        type={toast.type || AlertType.NORMAL}
        onClose={handleClose}
      />
    </div>
  );
}

export default ToastContainer;
