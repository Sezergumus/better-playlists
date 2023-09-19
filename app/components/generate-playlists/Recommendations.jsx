"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Recommendations({
  recommendationsData,
  selectedRecommendations,
  setSelectedRecommendations,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio, setAudio] = useState(null);

  const handlePreview = (track) => {
    if (track === null) {
      alert("Preview not available for this track");
      return;
    }

    // If another track is playing, stop it
    if (audio) {
      audio.pause();
    }

    if (currentTrack === track) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    // play audio with .2 volume
    const newAudio = new Audio(track);
    newAudio.volume = 0.1;
    newAudio.play();
    setAudio(newAudio);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleAddTrack = (track) => {
    const trackExists = selectedRecommendations.some(
      (selectedTrack) => selectedTrack.id === track.id
    );

    const newTrack = {
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      image: track.album.images[0].url,
      uri: track.uri,
    };

    if (trackExists) {
      const newSelectedReccomendations = selectedRecommendations.filter(
        (selectedTrack) => selectedTrack.id !== track.id
      );
      setSelectedRecommendations(newSelectedReccomendations);
      return;
    }

    // if track doesn't exist, add it to selectedTracks
    setSelectedRecommendations([...selectedRecommendations, newTrack]);
  };

  return (
    <div className="recommendations-container justify-items-center grid px-8 mt-8 gap-2">
      {recommendationsData &&
        recommendationsData.tracks.map((track) => (
          <div
            key={track.id}
            className="recommendation-container flex justify-between items-center gap-4 p-4 rounded-md w-fit w-96"
          >
            <div className="track-info flex items-center gap-4">
              <div className="track-image-container w-16 h-16 relative">
                <Image
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="track-name flex flex-col">
                <h1 className="text-bgPrimary font-bold text-md truncate w-40">
                  {track.name}
                </h1>
                <h1 className="text-bgPrimary text-sm opacity-80 truncate w-40">
                  {track.artists[0].name}
                </h1>
              </div>
            </div>
            <div className="track-options flex items-center gap-2">
              <button
                onClick={() => {
                  handlePreview(track.preview_url);
                }}
              >
                {isPlaying && currentTrack === track.preview_url ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0,0,256,256"
                    className="pause-icon"
                    alt="Pause Icon"
                  >
                    <g transform="translate(-10.24,-10.24) scale(1.08,1.08)">
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
                        <g transform="scale(5.12,5.12)">
                          <path d="M25,2c-12.68359,0 -23,10.31641 -23,23c0,12.68359 10.31641,23 23,23c12.68359,0 23,-10.31641 23,-23c0,-12.68359 -10.31641,-23 -23,-23zM22,34h-5v-18h5zM33,34h-5v-18h5z"></path>
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
                    className="play-icon"
                    alt="Play Icon"
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
                          <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM20.304,15.402l-7.608,4.392c-0.383,0.221 -0.696,0.04 -0.696,-0.402v-8.785c0,-0.442 0.313,-0.623 0.696,-0.402l7.608,4.392c0.383,0.222 0.383,0.584 0,0.805z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleAddTrack(track);
                }}
              >
                {selectedRecommendations.some(
                  (selectedTrack) => selectedTrack.id === track.id
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
        ))}
    </div>
  );
}
