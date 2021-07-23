import React from 'react';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onClick }) => (
  <>
    {images.map(image => (
      <li
        onClick={() => onClick(image.largeImageURL, image.tags)}
        className={styles.ImageGalleryItem}
        key={image.id}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={styles.ImageGalleryItem__image}
        />
      </li>
    ))}
  </>
);

export default ImageGalleryItem;
