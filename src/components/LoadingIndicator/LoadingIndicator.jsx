import React from 'react';
import Loader from 'react-loader-spinner';
import { loaderStyle } from './LoadingIndicator.module.css';

const LoadingIndicator = () => (
  <Loader
    className={loaderStyle}
    type="ThreeDots"
    color="#00BFFF"
    height={80}
    width={80}
  />
);

export default LoadingIndicator;
