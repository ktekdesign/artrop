import ToastContext from '../context/toastContext';
import { useContext } from 'react';

export default function useToast() {
  return useContext(ToastContext);
}
