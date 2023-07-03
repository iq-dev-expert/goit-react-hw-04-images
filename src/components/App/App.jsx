import { useState, useEffect } from 'react';
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

export function App() {
  const [imageKeyword, setImageKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (imageKeyword === '') {
      return;
    }

    (async () => {
      const KEY_WORD = imageKeyword;
      setLoading(true);

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

        setDataList(prevDataList => [...prevDataList, ...images]);
        setTotalImages(totalImages);
      } catch (error) {
        Report.failure(
          `Search query by data: ${imageKeyword} not found!`,
          'Enter another search query',
          'OK',
          reportInfoOptions
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [imageKeyword, page]);

  const onSubmit = imageKeyword => {
    setImageKeyword(imageKeyword);
    setPage(1);
    setDataList([]);
    setTotalImages(0);
  };

  const onLoadMoreButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showButton = !loading && dataList.length !== totalImages;

  return (
    <AppStyle>
      <Searchbar onSubmit={onSubmit} />
      <Loader isLoading={loading} />
      {dataList && <ImageGallery dataList={dataList} />}
      {showButton && <Button onLoadMoreButtonClick={onLoadMoreButtonClick} />}
    </AppStyle>
  );
}
