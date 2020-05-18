import React, { Component } from 'react';
// Components
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
// Utilities
import fetchImages from '../../services/gallery-api';
import bottomScroll from '../../services/utilities';

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
    const { query, pageNumber, gallery } = this.state;

    if (query !== prevState.query || pageNumber !== prevState.pageNumber) {
      this.setState({ isLoading: true });

      fetchImages(query, pageNumber)
        .then(res =>
          !gallery.length
            ? this.setState({ gallery: [...res.data.hits] })
            : this.setState({
                gallery: [...prevState.gallery, ...res.data.hits],
              }),
        )
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });

          if (pageNumber !== 1) bottomScroll();
        });
    }
  }

  getSearchQuery = data => {
    this.setState({ query: data, gallery: [], pageNumber: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  handleCloseModal = () =>
    this.setState({ isModalOpen: false, largeImageUrl: '' });

  handleOpenModal = ({ target }) =>
    this.setState({
      isModalOpen: true,
      largeImageUrl: target.attributes['large-img'].value,
    });

  render() {
    const { gallery, isLoading, largeImageUrl, isModalOpen } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.getSearchQuery} />
        <ImageGallery images={gallery} onClick={this.handleOpenModal} />
        {isLoading && <LoadingIndicator />}
        {!!gallery.length && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal src={largeImageUrl} onClose={this.handleCloseModal} />
        )}
      </>
    );
  }
}
