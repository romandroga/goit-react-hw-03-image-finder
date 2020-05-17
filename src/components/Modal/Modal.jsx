import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { overlayStyle, modalStyle } from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  overlayRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.onClose();
  };

  handleOverlayClick = e => {
    const { current } = this.overlayRef;
    if (current && e.target !== current) return;

    this.props.onClose();
  };

  render() {
    const { src } = this.props;
    return (
      <div
        className={overlayStyle}
        ref={this.overlayRef}
        onClick={this.handleOverlayClick}
      >
        <div>
          <img className={modalStyle} alt="modal" src={src} />
        </div>
      </div>
    );
  }
}
