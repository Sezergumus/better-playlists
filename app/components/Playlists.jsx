"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Playlists(props) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const { playlists, username } = props;

  useEffect(() => {
    const userPlaylists = playlists.filter((playlist) => {
      return playlist.owner.display_name === username;
    });
    setUserPlaylists(userPlaylists);
  }, [playlists]);

  return (
    <div className="playlists-container w-full mt-12">
      <div className="playlists-inner-container w-fit max-w-[90%] mx-auto">
        <h1 className="text-bgPrimary font-bold text-2xl mb-2">Playlists </h1>
        <div className="playlists flex overflow-x-auto gap-2">
          {userPlaylists.map((playlist) => {
            return (
              <Link
                href={playlist.external_urls.spotify}
                target="_blank"
                key={playlist.name}
              >
                <div
                  className="playlist-container flex flex-col justify-center items-center"
                  key={playlist.name}
                >
                  <div className="playlist-image-container w-24 h-24 relative">
                    {playlist.images[0] && (
                      <Image
                        src={playlist.images[0].url}
                        layout="fill"
                        objectFit="cover"
                        alt={playlist.name + " playlist image"}
                      />
                    )}
                  </div>
                  <h2 className="truncate w-24 text-center">{playlist.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
