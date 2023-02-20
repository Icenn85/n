//ДЛЯ ПІДКЛЮЧЕННЯ/ПЕРЕВІРКИ вставити цей код наприклад у Арр
// const [modalActive, setModalActive] = useState(true)

// {/* LOGOUT or delete button */}
// <button onClick={() => setModalActive(true)}>Exit</button>

// <Modal active={modalActive} setActive={setModalActive}>Do you really want to leave?</Modal>

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { VscChromeClose } from 'react-icons/vsc';
import PropTypes from 'prop-types';

import Button from 'shared/Button/Button';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ active, setActive, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape' && active) {
        setActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, setActive]);

  return createPortal(
    <div
      className={
        active
          ? `${css.modal__backdrop} ${css.active}`
          : `${css.modal__backdrop}`
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${css.modal__content} ${css.active}`
            : `${css.modal__content}`
        }
        onClick={e => e.stopPropagation()}
      >
        <button
          className={css.modal__closeBtn}
          type="button"
          onClick={() => setActive(false)}
        >
          <VscChromeClose size={20} color="#52555F" />
        </button>
        <p className={css.modal__question}>{children}</p>
        <div className={css.modal__btnWrapper}>
          <Button
            type="submit"
            variant="accentBtn"
            onClick={() => {
              console.log('Delete transaction or logout');
              setActive(false);
            }}
          >
            YES
          </Button>
          <Button
            type="button"
            variant="basicBtn"
            onClick={() => setActive(false)}
          >
            NO
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
