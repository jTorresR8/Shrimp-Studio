import React from 'react';

const AudioPlayer = ({ src }) => {
  return (
    <div>
      {src && <audio src={src} controls />}
    </div>
  );
};

export default AudioPlayer;
