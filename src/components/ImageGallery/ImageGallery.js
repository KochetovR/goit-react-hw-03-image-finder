import { Component } from 'react';
import imageFinderAPI from '../services/imageFinder-api';
import Modal from '../Modal/Modal';
import LoaderComponent from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

import styles from './ImageGallery.module.css';

const KEY = '21916161-6ae0745b5418f2e7bb34916ca';
const URL = 'https://pixabay.com/api/';
let page = 1;

class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    urlImage: '',
    tagsImage: '',
    showModal: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevReq = prevProps.images;
    const nextReq = this.props.images;

    if (prevReq !== nextReq) {
      this.setState({ status: 'pending' });

      imageFinderAPI
        .fetchImages(nextReq)
        .then(images => {
          if (images.hits.length === 0) {
            return this.setState({ status: 'rejected' });
          }
          this.setState({ images: images.hits, status: 'resolved' });
        })
        .finally(() => this.scrollPage());
    }
  }

  handleClickLoadMore = () => {
    page += 1;

    this.setState({ status: 'pending' });

    fetch(
      `${URL}?q=${this.props.images}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => res.json())
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: 'resolved',
        })),
      )
      .finally(() => this.scrollPage());
  };

  handleClickItem = (largeImageURL, tags) => {
    this.setState({
      urlImage: largeImageURL,
      tagsImage: tags,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, showModal, urlImage, tagsImage, status } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return <LoaderComponent />;
    }

    if (status === 'rejected') {
      return <h1 className={styles.warning}>Enter something else</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={styles.ImageGallery}>
            {images && (
              <ImageGalleryItem
                images={images}
                onClick={this.handleClickItem}
              />
            )}
          </ul>
          {images && <Button onClick={this.handleClickLoadMore} />}

          {showModal && (
            <Modal onClose={this.closeModal} url={urlImage} tags={tagsImage} />
          )}
        </>
      );
    }
  }
}
export default ImageGallery;
