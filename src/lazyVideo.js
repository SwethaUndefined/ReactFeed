import React from 'react';

const LazyVideo = ({ src }) => {
  return (
    <video controls style={{ height: '300px',width : '900px' }}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
