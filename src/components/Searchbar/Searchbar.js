import React, { Component } from 'react';
import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    images: '',
  };

  handleInputChange = e => {
    const value = e.currentTarget.value.toLowerCase();

    this.setState({ images: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.images.trim() === '') {
      toast.error('Enter a valid search');
      return;
    }
    this.props.onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ images: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__button__label}>Search</span>
          </button>

          <input
            value={this.state.images}
            onChange={this.handleInputChange}
            className={styles.SearchForm__input}
            type="text"
            // autocomplete="off"
            // autofocus="true"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
