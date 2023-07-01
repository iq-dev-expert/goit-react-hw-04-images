import { useState } from 'react';
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

export function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = e => {
    setInputValue(e.target.value.toLowerCase());
  };

  const onFormSubmit = e => {
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

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <SearchbarStyle>
      <SearchForm onSubmit={onFormSubmit}>
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
          onChange={onInputChange}
        />
      </SearchForm>
    </SearchbarStyle>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
