import styles from './modal-overlay.module.css';

function ModalOverlay ({ children, onClose }) {

  return (
    <div className={styles.modalContainer} onClose={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
