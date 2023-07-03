import { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';
import PropTypes from 'prop-types';

export function Modal({ closeModal, largeImg, tagImg }) {
  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', onEscClick);
    return () => {
      document.removeEventListener('keydown', onEscClick);
    };
  }, [closeModal]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={onOverlayClick}>
      <ModalStyle>
        <img src={largeImg} alt={tagImg} />
      </ModalStyle>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  tagImg: PropTypes.string.isRequired,
};
