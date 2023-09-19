/** @type {import('next').NextConfig} */
const nextConfig = {
  // image source
  images: {
    domains: [
      "i.scdn.co",
      "blend-playlist-covers.spotifycdn.com",
      "wrapped-images.spotifycdn.com",
      "images-ak.spotifycdn.com",
      "mosaic.scdn.co",
      "image-cdn-ak.spotifycdn.com",
    ],
  },
};

module.exports = nextConfig;
