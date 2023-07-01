import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItemStyle,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ largeImg, smallImg, tagImg }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImageGalleryItemStyle>
      <ImageGalleryItemImage src={smallImg} alt={tagImg} onClick={openModal} />
      {isModalOpen && (
        <Modal closeModal={closeModal} largeImg={largeImg} tagImg={tagImg} />
      )}
    </ImageGalleryItemStyle>
  );
}

ImageGalleryItem.propTypes = PropTypes.string.isRequired;
