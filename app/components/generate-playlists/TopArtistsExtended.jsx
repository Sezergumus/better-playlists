import React from "react";
import Image from "next/image";

export default function TopArtistsExtended({
  topArtists,
  selectedArtists,
  setSelectedArtists,
}) {
  const handleAddArtist = (artist) => {
    // check if artist is already in selectedArtists by comparing artist id
    const artistExists = selectedArtists.some(
      (selectedArtist) => selectedArtist.id === artist.id
    );

    // get some info from artist
    const newArtist = {
      id: artist.id,
      name: artist.name,
      image: artist.images[0].url,
    };

    // if artist exists, remove it from selectedArtists
    if (artistExists) {
      const newSelectedArtists = selectedArtists.filter(
        (selectedArtist) => selectedArtist.id !== artist.id
      );
      setSelectedArtists(newSelectedArtists);
      return;
    }

    // if there are less than 25 artists, add artist to selectedArtists
    if (selectedArtists.length < 25) {
      setSelectedArtists([...selectedArtists, newArtist]);
    } else {
      alert("You can only select up to 25 artists!");
    }
  };

  return (
    <div className="top-artists-extended w-fit">
      <h1 className="text-bgPrimary font-bold text-2xl">
        Select from your top artists
      </h1>
      <div className="artists-container flex flex-col gap-1 mt-4">
        {topArtists.map((artist) => {
          return (
            <div
              className="artist-container flex items-center justify-between gap-4 p-4 rounded-md"
              key={artist.name}
            >
              <div className="artist-info flex items-center gap-4">
                <div className="artist-image w-16 h-16 relative">
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name + " Image"}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="artist-name flex flex-col">
                  <h1 className="text-bgPrimary font-bold text-md">
                    {artist.name}
                  </h1>
                </div>
              </div>
              <div className="artist-options flex items-center gap-4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAddArtist(artist);
                  }}
                >
                  {/* if artist is selected rotate svg */}
                  {selectedArtists.some(
                    (selectedArtist) => selectedArtist.id === artist.id
                  ) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="32"
                      height="32"
                      viewBox="0,0,256,256"
                      className="add-icon rotate-45 transform transition-all duration-300 ease-in-out"
                    >
                      <g transform="translate(-32,-32) scale(1.25,1.25)">
                        <g
                          fill="#000000"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <g transform="scale(8.53333,8.53333)">
                            <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM20,16h-4v4c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-4h-4c-0.552,0 -1,-0.447 -1,-1c0,-0.553 0.448,-1 1,-1h4v-4c0,-0.553 0.448,-1 1,-1c0.552,0 1,0.447 1,1v4h4c0.552,0 1,0.447 1,1c0,0.553 -0.448,1 -1,1z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="32"
                      height="32"
                      viewBox="0,0,256,256"
                      className="add-icon transform transition-all duration-300 ease-in-out"
                    >
                      <g transform="translate(-32,-32) scale(1.25,1.25)">
                        <g
                          fill="#000000"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <g transform="scale(8.53333,8.53333)">
                            <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM20,16h-4v4c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-4h-4c-0.552,0 -1,-0.447 -1,-1c0,-0.553 0.448,-1 1,-1h4v-4c0,-0.553 0.448,-1 1,-1c0.552,0 1,0.447 1,1v4h4c0.552,0 1,0.447 1,1c0,0.553 -0.448,1 -1,1z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
