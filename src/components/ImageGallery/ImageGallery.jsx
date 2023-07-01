import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export function ImageGallery({ dataList }) {
  return (
    <ImageGalleryStyle>
      {dataList.map(dataItem => {
        const { largeImageURL, webformatURL, tags, id } = dataItem;

        return (
          <ImageGalleryItem
            largeImg={largeImageURL}
            smallImg={webformatURL}
            tagImg={tags}
            key={id}
          />
        );
      })}
    </ImageGalleryStyle>
  );
}

ImageGallery.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
