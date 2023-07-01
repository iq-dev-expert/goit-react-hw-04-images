import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Fetch } from 'utils/js/fetch';
import { AppStyle } from './App.styled';
import { Report } from 'notiflix/build/notiflix-report-aio';

const reportInfoOptions = {
  backOverlayClickToClose: true,
  messageFontSize: '16px',
  titleMaxLength: 50,
  width: '420px',
};

export class App extends Component {
  state = {
    imageKeyword: '',
    page: 1,
    dataList: [],
    loading: false,
    totalImages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { imageKeyword, page } = this.state;

    if (prevState.imageKeyword !== imageKeyword || prevState.page !== page) {
      const KEY_WORD = imageKeyword;
      this.setState({ loading: true });

      try {
        const { totalImages, images } = await Fetch(KEY_WORD, page);

        if (totalImages === 0) {
          Report.failure(
            `Search query by data: ${imageKeyword} not found!`,
            'Enter another search query',
            'OK',
            reportInfoOptions
          );
          return;
        }

        this.setState(({ dataList }) => {
          return {
            dataList: [...dataList, ...images],
            totalImages,
          };
        });
      } catch (error) {
        Report.failure(
          `Search query by data: ${imageKeyword} not found!`,
          'Enter another search query',
          'OK',
          reportInfoOptions
        );
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = imageKeyword => {
    this.setState({ imageKeyword, page: 1, dataList: [], totalImages: 0 });
  };

  onLoadMoreButtonClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { loading, dataList, totalImages } = this.state;

    const showButton = !loading && dataList.length !== totalImages;

    return (
      <AppStyle>
        <Searchbar onSubmit={this.onSubmit} />
        <Loader isLoading={loading} />
        {dataList && <ImageGallery dataList={dataList} />}
        {showButton && (
          <Button onLoadMoreButtonClick={this.onLoadMoreButtonClick} />
        )}
      </AppStyle>
    );
  }
}
