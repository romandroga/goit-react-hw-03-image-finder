import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => (
  <ul className={ImageGalleryStyle}>
    {images.map(({ webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={uuidv4()}
        previewURL={webformatURL}
        tags={tags}
        largeImg={largeImageURL}
        onClick={onClick}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
