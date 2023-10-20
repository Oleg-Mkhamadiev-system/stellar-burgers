import { forwardRef } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = forwardRef (function ModalOverlay (props, modalOverlayRef) {
const { children, ...otherProps } = props;
  return (
    <div className={styles.modalContainer} {...otherProps} ref={modalOverlayRef}>
      {children}
    </div>
  );
});

export default ModalOverlay;
