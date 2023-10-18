import styles from './modal.module.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function Modal ({ onClose, children }) {
    const modalOverlay = useRef(null);

    useEffect(() => {
        const handleCloseContainer = (evt) => {
            if (modalOverlay.current === evt.target) {
                onClose?.();
            }
        };

        const handleCloseEscape = (evt) => {
            if (evt.key === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('click', handleCloseContainer);
        document.addEventListener('keydown', handleCloseEscape);

        return () => {
        document.removeEventListener('click', handleCloseContainer);
        document.removeEventListener('keydown', handleCloseEscape);
      };
    }, [onClose]);

    const handleClose = () => {
        onClose?.();
    };

    return createPortal(
          <div>
            <div className={styles.modalContainer}
              ref={modalOverlay}>
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
            </div>
          </div>,
            document.getElementById("modals")
    );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default Modal;
