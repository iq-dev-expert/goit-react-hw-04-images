import { Component } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImg, tagImg } = this.props;

    return (
      <Overlay onClick={this.onClick}>
        <ModalStyle>
          <img src={largeImg} alt={tagImg} />
        </ModalStyle>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  tagImg: PropTypes.string.isRequired,
};
