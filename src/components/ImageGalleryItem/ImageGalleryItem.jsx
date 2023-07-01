import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItemStyle,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ largeImg, smallImg, tagImg }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const useToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ImageGalleryItemStyle>
      <ImageGalleryItemImage src={smallImg} alt={tagImg} onClick={useToggle} />
      {isModalOpen && (
        <Modal closeModal={useToggle} largeImg={largeImg} tagImg={tagImg} />
      )}
    </ImageGalleryItemStyle>
  );
}

ImageGalleryItem.propTypes = PropTypes.string.isRequired;
