import React from 'react';

const LazyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} style={{height : '200px',width : '434px'}}/>;
};

export default LazyImage;
