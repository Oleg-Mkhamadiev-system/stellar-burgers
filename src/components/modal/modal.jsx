import styles from './modal.module.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import Portal, { createContainer } from '../portal/portal';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Modal ({ onClose, children }) {
    const modalRootRef = useRef(null);
    const modalContainerId = "modal-container-id";
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        createContainer({ id: modalContainerId });
        setMounted(true)
    }, []);

    useEffect(() => {
        const handleCloseContainer = (evt) => {
            if (modalRootRef.current === evt.target) {
                onClose?.();
            }
        };

        const handleCloseEscape = (evt) => {
            if (evt.target === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('click', handleCloseContainer);
        document.addEventListener('keydown', handleCloseEscape);

        return () => {
        document.addEventListener('click', handleCloseContainer);
        document.addEventListener('keydown', handleCloseEscape);
      };
    }, [onClose]);

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return (
        isMounted
        ? (<Portal id={modalContainerId}>
            <div className={styles.modalContainer}
              ref={modalRootRef} data-testid={modalContainerId}>
                <div className={styles.modalContent}>
                    <button
                    type="button"
                    className={styles.closeButton}
                    onClose={handleClose}
                    data-testid="modal-close-button"
                    >
                    <CloseIcon type="primary" />
                    </button>
                   {children}
                </div>
            </div>
          </Portal>)
        : null
    );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default Modal;
