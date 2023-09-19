import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function TopArtists(props) {
  const topArtists = props.data;

  return (
    <div className="top-artists w-fit mx-auto mt-12">
      <h1 className="text-bgPrimary font-bold text-2xl mb-2">
        These are your top artists!
      </h1>
      <div className="artists-container flex justify-center gap-8">
        {topArtists.map((artist) => {
          return (
            <Link
              href={artist.external_urls.spotify}
              target="_blank"
              key={artist.name}
            >
              <div
                className="artist-container flex flex-col items-center justify-center gap-2"
                key={artist.name}
              >
                <div className="artist-image-container w-48 h-48 relative">
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name + " Image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-bgPrimary text-md font-bold w-48 truncate text-center">
                  {artist.name}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
