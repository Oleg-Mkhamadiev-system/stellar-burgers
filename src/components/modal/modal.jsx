import styles from './modal.module.css';
import { useRef, useCallback, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal ({ onClose, children }) {
  const modalRoot = document.getElementById("modals");
  const modalOverlayRef = useRef(null);

    useEffect(() => {
        const handleCloseEscape = (evt) => {
            if (evt.key === 'Escape') {
                onClose?.();
            }
        };

        const handleCloseContainer = (evt) => {
          if (modalOverlayRef.current === evt.target) {
              onClose?.();
          }
      };

        document.addEventListener('click', handleCloseContainer);
        document.addEventListener('keydown', handleCloseEscape);

        return () => {
        document.removeEventListener('keydown', handleCloseEscape);
        document.removeEventListener('click', handleCloseContainer);
      };
    }, [onClose]);

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return createPortal(
          <ModalOverlay ref={modalOverlayRef}>
                <div className={styles.modalContent}>
                    <button
                    type="button"
                    className={`${styles.closeButton}`}
                    onClick={handleClose}
                    >
                    <CloseIcon type="primary" />
                    </button>
                      {children}
                </div>
          </ModalOverlay>,
          modalRoot
    );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default Modal;
