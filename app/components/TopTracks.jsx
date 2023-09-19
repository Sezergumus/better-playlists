import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function TopTracks(props) {
  const topTracks = props.data;

  return (
    <div className="top-tracks w-fit mx-auto mt-12">
      <h1 className="text-bgPrimary font-bold text-2xl mb-2">
        These are your top tracks!
      </h1>
      <div className="tracks-container flex justify-center gap-8">
        {topTracks.map((track) => {
          return (
            <Link
              href={track.external_urls.spotify}
              target="_blank"
              key={track.name}
            >
              <div
                className="track-container flex flex-col items-center justify-center gap-2"
                key={track.name}
              >
                <div className="track-image-container w-48 h-48 relative">
                  <Image
                    src={track.album.images[0].url}
                    alt={track.name + " Image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-bgPrimary text-md font-bold truncate text-center">
                  {track.name}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
