import React, { useEffect, useState } from "react";
import Image from "next/image";
import getAudioFeatures from "@/app/util/getAudioFeatures";
import getArtistGenres from "@/app/util/getArtistGenres";
import fetcher from "@/app/util/fetch";

export default function SelectedItems(props) {
  const {
    accessToken,
    selectedTracks,
    setSelectedTracks,
    selectedArtists,
    setSelectedArtists,
    market,
    setStep,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [audioFeatures, setAudioFeatures] = useState([]);
  const [artistGenres, setArtistGenres] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleRemoveTrack = (track) => {
    const newSelectedTracks = selectedTracks.filter(
      (selectedTrack) => selectedTrack.id !== track.id
    );
    setSelectedTracks(newSelectedTracks);
  };

  const handleRemoveArtist = (artist) => {
    const newSelectedArtists = selectedArtists.filter(
      (selectedArtist) => selectedArtist.id !== artist.id
    );
    setSelectedArtists(newSelectedArtists);
  };

  const handleGeneratePlaylists = () => {
    const selectedTrackIds = selectedTracks.map((track) => track.id);
    const selectedArtistIds = selectedArtists.map((artist) => artist.id);

    if (!selectedTrackIds.length) {
      alert("Please select at least one track.");
      return;
    }

    if (selectedTrackIds.length) {
      getAudioFeatures(accessToken, selectedTrackIds).then((res) => {
        setAudioFeatures(res);
      });
    }

    if (selectedArtistIds.length) {
      getArtistGenres(accessToken, selectedArtistIds).then((res) => {
        setArtistGenres(res);
      });
    }
  };

  useEffect(() => {
    // if audio features object is not empty
    if (Object.keys(audioFeatures).length) {
      const trackIds = selectedTracks
        .map((track) => track.id)
        .slice(0, 5 - artistGenres.length);

      const fetchLink =
        "https://api.spotify.com/v1/recommendations?limit=100" +
        "&market=" +
        market +
        (artistGenres.length ? "&seed_genres=" + artistGenres.join(",") : "") +
        "&seed_tracks=" +
        trackIds.join(",") +
        "&target_acousticness=" +
        audioFeatures.acousticness +
        "&target_danceability=" +
        audioFeatures.danceability +
        "&target_energy=" +
        audioFeatures.energy +
        "&target_loudness=" +
        audioFeatures.loudness +
        "&target_speechiness=" +
        audioFeatures.speechiness +
        "&target_tempo=" +
        audioFeatures.tempo;

      fetcher(fetchLink, accessToken, "recommendationsData").then((res) => {
        setStep(2);
      });
    }
  }, [audioFeatures, artistGenres]);

  return (
    <div className="selected-items-container flex flex-col overflow-hidden sticky bottom-0">
      <div
        className={`modal-container flex bg-bgPrimary/90 w-full text-white px-8 py-4 ${
          modalOpen ? "modal-open" : "modal-closed"
        }`}
      >
        <div className="flex flex-col justify-between w-full gap-6">
          <div className="modal flex flex-col px-8 w-full border-b border-white py-2">
            <h2 className="text-2xl font-bold mb-2">Selected Tracks</h2>
            <div className="flex gap-4 overflow-x-auto selected-modal">
              {selectedTracks.length ? (
                selectedTracks.map((track, index) => {
                  return (
                    <div
                      className="track flex flex-col justify-center items-center"
                      key={index}
                    >
                      <div className="track-image relative w-16 h-16">
                        <Image
                          src={track.image}
                          alt={track.name}
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="roll-over absolute opacity-0 hover:opacity-100 w-full h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center bg-black/60">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="32"
                            height="32"
                            viewBox="0,0,256,256"
                            className="cursor-pointer"
                            onClick={() => {
                              handleRemoveTrack(track);
                            }}
                          >
                            <g transform="translate(-40.96,-40.96) scale(1.32,1.32)">
                              <g
                                fill="#ffffff"
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
                                <g transform="scale(5.12,5.12)">
                                  <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="track-info">
                        <h3 className="text-md font-bold truncate text-center w-32">
                          {track.name}
                        </h3>
                        <p className="text-sm truncate text-center w-32">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-tracks">
                  <p className="text-sm text-center">
                    No tracks selected. Please select some tracks.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="modal flex flex-col px-8 w-full">
            <h2 className="text-2xl font-bold mb-2">Selected Artists</h2>
            <div className="flex gap-4 overflow-x-auto selected-modal">
              {selectedArtists.length ? (
                selectedArtists.map((artist, index) => {
                  return (
                    <div
                      className="artist flex flex-col justify-center items-center"
                      key={index}
                    >
                      <div className="artist-image relative w-16 h-16">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="roll-over absolute opacity-0 hover:opacity-100 w-full h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center bg-black/60">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="32"
                            height="32"
                            viewBox="0,0,256,256"
                            className="cursor-pointer"
                            onClick={() => {
                              handleRemoveArtist(artist);
                            }}
                          >
                            <g transform="translate(-40.96,-40.96) scale(1.32,1.32)">
                              <g
                                fill="#ffffff"
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
                                <g transform="scale(5.12,5.12)">
                                  <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="artist-info">
                        <h3 className="text-lg font-bold truncate text-center w-32">
                          {artist.name}
                        </h3>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-artists">
                  <p className="text-sm text-center">
                    No artists selected. Please select some artists.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="close-button absolute right-6 cursor-pointer"
          onClick={() => {
            handleModalOpen();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
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
                <path d="M7,4c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-2,2c-0.391,0.391 -0.391,1.02406 0,1.41406l7.29297,7.29297l-7.29297,7.29297c-0.391,0.391 -0.391,1.02406 0,1.41406l2,2c0.391,0.391 1.02406,0.391 1.41406,0l7.29297,-7.29297l7.29297,7.29297c0.39,0.391 1.02406,0.391 1.41406,0l2,-2c0.391,-0.391 0.391,-1.02406 0,-1.41406l-7.29297,-7.29297l7.29297,-7.29297c0.391,-0.39 0.391,-1.02406 0,-1.41406l-2,-2c-0.391,-0.391 -1.02406,-0.391 -1.41406,0l-7.29297,7.29297l-7.29297,-7.29297c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297z"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="selected-items flex items-center w-full bg-bgPrimary px-8 py-4 border-t border-white">
        <div className="selected-info flex flex-col text-white mr-4">
          <h2 className="text-xl font-bold mb-2">
            {selectedTracks.length ? (
              <>
                {selectedTracks.length === 1 ? (
                  <span>1 Track Selected</span>
                ) : (
                  <span>{selectedTracks.length} Tracks Selected</span>
                )}
              </>
            ) : (
              <span>No Tracks Selected</span>
            )}
          </h2>
          <h2 className="text-xl font-bold">
            {selectedArtists.length ? (
              <>
                {selectedArtists.length === 1 ? (
                  <span>1 Artist Selected</span>
                ) : (
                  <span>{selectedArtists.length} Artists Selected</span>
                )}
              </>
            ) : (
              <span>No Artists Selected</span>
            )}
          </h2>
        </div>
        <div
          className={`up-button cursor-pointer ${
            modalOpen ? "rotate-180" : ""
          }`}
          onClick={() => {
            handleModalOpen();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
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
              <g transform="scale(10.66667,10.66667)">
                <path d="M20.26,12.948l-7.15,-4.766c-0.672,-0.448 -1.547,-0.448 -2.219,0l-7.15,4.766c-0.463,0.309 -0.741,0.829 -0.741,1.385v0c0,1.329 1.481,2.121 2.587,1.384l6.413,-4.275l6.413,4.276c1.106,0.737 2.587,-0.056 2.587,-1.385v0c0,-0.557 -0.278,-1.076 -0.74,-1.385z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="continue-button flex justify-center items-center ml-auto">
          <button
            className="bg-blueButton text-bgPrimary text-lg font-bold py-2 px-4 rounded-full hover:bg-[#b7bad5] transition-all"
            onClick={() => {
              handleGeneratePlaylists();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
