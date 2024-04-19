import ModalContext from '../context/modalContext';
import { useContext } from 'react';

export default function useModal() {
  return useContext(ModalContext);
}
