import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageGalleryItemStyle,
  ImageGalleryItemImage,
} from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ previewURL, tags, largeImg, onClick }) => (
  <li className={ImageGalleryItemStyle}>
    <img
      src={previewURL}
      alt={tags}
      className={ImageGalleryItemImage}
      large-img={largeImg}
      onClick={onClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  previewURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
