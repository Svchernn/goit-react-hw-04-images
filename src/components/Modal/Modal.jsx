import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ close, children }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal} onClick={close}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
