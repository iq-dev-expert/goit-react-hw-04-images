import { Component } from 'react';
import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Report } from 'notiflix/build/notiflix-report-aio';
import PropTypes from 'prop-types';

const reportInfoOptions = {
  backOverlayClickToClose: true,
  messageFontSize: '16px',
};

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value.toLowerCase() });
  };

  onFormSubmit = e => {
    const { inputValue } = this.state;

    e.preventDefault();

    if (inputValue.trim() === '') {
      Report.info(
        'The search field cannot be empty',
        'Enter search query',
        'OK',
        reportInfoOptions
      );
      return;
    }

    this.props.onSubmit(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.onFormSubmit}>
          <SearchFormButton type="submit">
            <span>
              <PiMagnifyingGlassBold />
            </span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.onInputChange}
          />
        </SearchForm>
      </SearchbarStyle>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
