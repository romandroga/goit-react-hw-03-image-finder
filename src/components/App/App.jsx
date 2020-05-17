import React, { Component } from 'react';
// Components
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
// Utilities
import fetchImages from '../../services/gallery-api';

export default class App extends Component {
  state = {
    gallery: [],
    pageNumber: 1,
    query: '',
    largeImageUrl: '',
    isModalOpen: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;

    if (query !== prevState.query) {
      this.setState({ isLoading: true });

      fetchImages(query, pageNumber)
        .then(res => this.setState({ gallery: [...res.data.hits] }))
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading: false }));
      return;
    }

    if (pageNumber !== prevState.pageNumber && pageNumber !== 1) {
      this.setState({ isLoading: true });

      fetchImages(query, pageNumber)
        .then(res => {
          this.setState({ gallery: [...prevState.gallery, ...res.data.hits] });
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  getSearchQuery = data => {
    this.setState({ query: data, gallery: [], pageNumber: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  closeModal = () => this.setState({ isModalOpen: false, largeImageUrl: '' });

  openModal = ({ target }) =>
    this.setState({
      isModalOpen: true,
      largeImageUrl: target.attributes['large-img'].value,
    });

  render() {
    const { gallery, isLoading, largeImageUrl, isModalOpen } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.getSearchQuery} />
        <ImageGallery images={gallery} onClick={this.openModal} />
        {isLoading && <LoadingIndicator />}
        {!!gallery.length && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && <Modal src={largeImageUrl} onClose={this.closeModal} />}
      </>
    );
  }
}
