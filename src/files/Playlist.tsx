import React from 'react';

const Playlist: React.FC = () => {
  return (
      <iframe
        className="w-full"
        src="https://open.spotify.com/embed/playlist/7Afy13yvZVfjzuCpUfqrgP?utm_source=generator"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
  );
};

export default Playlist;
