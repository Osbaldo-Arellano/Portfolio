import React from 'react';

interface SpotifyEmbedProps {
  src: string; // The Spotify embed URL
  width?: string; // Optional: Set the width of the embed
  height?: string; // Optional: Set the height of the embed
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  src,
  width = '300',
  height = '380',
}) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      frameBorder="0"
      allowTransparency={true}
      allow="encrypted-media"
      className="rounded-lg shadow-lg border border-gray-300"
      title="Spotify Embed Player"
    ></iframe>
  );
};

export default SpotifyEmbed;
