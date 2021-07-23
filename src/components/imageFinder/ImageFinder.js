import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

class ImageFinder extends Component {
  state = {
    images: '',
  };

  formSubmitHandle = data => {
    const images = data.images;

    this.setState({
      images,
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandle} />
        <ToastContainer />
        <ImageGallery images={this.state.images} />
      </>
    );
  }
}

export default ImageFinder;
