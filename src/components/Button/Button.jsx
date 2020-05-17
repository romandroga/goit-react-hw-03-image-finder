import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyle } from './Button.module.css';

const Button = ({ onClick }) => (
  <button type="button" className={ButtonStyle} onClick={onClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
