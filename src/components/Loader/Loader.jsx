import { Loading } from 'notiflix/build/notiflix-loading-aio';
import PropTypes from 'prop-types';

export function Loader({ isLoading }) {
  isLoading ? Loading.dots() : Loading.remove();
}

Loader.propTypes = { isLoading: PropTypes.bool.isRequired };
