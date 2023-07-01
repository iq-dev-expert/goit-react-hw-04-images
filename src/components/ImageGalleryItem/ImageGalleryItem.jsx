import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItemStyle,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { smallImg, tagImg, largeImg } = this.props;
    const { isModalOpen } = this.state;

    return (
      <ImageGalleryItemStyle>
        <ImageGalleryItemImage
          src={smallImg}
          alt={tagImg}
          onClick={this.openModal}
        />
        {isModalOpen && (
          <Modal
            closeModal={this.closeModal}
            largeImg={largeImg}
            tagImg={tagImg}
          />
        )}
      </ImageGalleryItemStyle>
    );
  }
}

ImageGalleryItem.propTypes = PropTypes.string.isRequired;
