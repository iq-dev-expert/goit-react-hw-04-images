import { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';
import PropTypes from 'prop-types';

export function Modal({ closeModal, largeImg, tagImg }) {
  useEffect(() => {
    document.addEventListener('keydown', onEscClick);
    return () => {
      document.removeEventListener('keydown', onEscClick);
    };
  });

  const onEscClick = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const onClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={onClick}>
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
