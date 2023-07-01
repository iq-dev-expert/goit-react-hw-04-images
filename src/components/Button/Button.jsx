import { ButtonStyle } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ onLoadMoreButtonClick }) {
  return (
    <ButtonStyle type="button" onClick={onLoadMoreButtonClick}>
      Load more
    </ButtonStyle>
  );
}

Button.propTypes = { onLoadMoreButtonClick: PropTypes.func.isRequired };
