"use client";

import React from "react";
import Header from "@/app/components/Header";
import { useDataStore } from "@/app/states/data";
import { useEffect, useState } from "react";
import fetcherExtended from "@/app/util/fetcherExtended";
import userDataSetter from "@/app/util/userDataSetter";
import Loading from "@/app/components/Loading";
import TopArtistsExtended from "@/app/components/generate-playlists/TopArtistsExtended";
import TopTracksExtended from "@/app/components/generate-playlists/TopTracksExtended";
import SelectedItems from "@/app/components/generate-playlists/SelectedItems";
import Recommendations from "@/app/components/generate-playlists/Recommendations";
import SelectFilter from "@/app/components/generate-playlists/SelectFilter";
import PaginationHeader from "@/app/components/generate-playlists/PaginationHeader";
import SelectedRecommendations from "@/app/components/generate-playlists/SelectedRecommendations";
import GeneratePlaylist from "@/app/components/generate-playlists/GeneratePlaylist";

export default function Page() {
  const [timeRange, setTimeRange] = useState("medium_term");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);

  const {
    accessToken,
    topArtistsExtendedData,
    topTracksExtendedData,
    userData,
    loading,
    setAllData,
    recommendationsData,
  } = useDataStore();

  useEffect(() => {
    if (!accessToken) {
      // get access token from cookie
      const token =
        (document.cookie &&
          document.cookie.split(";").find((item) => {
            return item.includes("access_token");
          })) ||
        "";

      if (token) {
        const tokenValue = token.split("=")[1];
        setAllData({
          accessToken: tokenValue,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    if (!userData) {
      userDataSetter(accessToken);
    }

    if (
      !topArtistsExtendedData[timeRange] ||
      !topTracksExtendedData[timeRange]
    ) {
      fetcherExtended(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=15`,
        accessToken,
        "topArtistsExtendedData",
        timeRange
      );
      fetcherExtended(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=15`,
        accessToken,
        "topTracksExtendedData",
        timeRange
      );
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    if (
      !topArtistsExtendedData[timeRange] ||
      !topTracksExtendedData[timeRange]
    ) {
      fetcherExtended(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=15`,
        accessToken,
        "topArtistsExtendedData",
        timeRange
      );
      fetcherExtended(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=15`,
        accessToken,
        "topTracksExtendedData",
        timeRange
      );
    }
  }, [timeRange]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header activePage={"playlists"} />
          {topArtistsExtendedData[timeRange] &&
          topTracksExtendedData[timeRange] ? (
            <>
              <PaginationHeader step={step} setStep={setStep} />
              {step === 1 ? (
                <div className="generate-playlists-top">
                  {/* select time range */}
                  <SelectFilter
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    setSelectedTracks={setSelectedTracks}
                    setSelectedArtists={setSelectedArtists}
                  />
                  <div className="flex tracks-artists-container justify-evenly px-8 mt-4">
                    <TopTracksExtended
                      topTracks={topTracksExtendedData[timeRange].items}
                      selectedTracks={selectedTracks}
                      setSelectedTracks={setSelectedTracks}
                    />
                    <TopArtistsExtended
                      topArtists={topArtistsExtendedData[timeRange].items}
                      selectedArtists={selectedArtists}
                      setSelectedArtists={setSelectedArtists}
                    />
                  </div>
                  <SelectedItems
                    accessToken={accessToken}
                    selectedTracks={selectedTracks}
                    setSelectedTracks={setSelectedTracks}
                    selectedArtists={selectedArtists}
                    setSelectedArtists={setSelectedArtists}
                    market={userData.country}
                    setStep={setStep}
                  />
                </div>
              ) : step === 2 ? (
                <>
                  <Recommendations
                    recommendationsData={recommendationsData}
                    selectedRecommendations={selectedRecommendations}
                    setSelectedRecommendations={setSelectedRecommendations}
                  />
                  <SelectedRecommendations
                    selectedRecommendations={selectedRecommendations}
                    setSelectedRecommendations={setSelectedRecommendations}
                    setStep={setStep}
                  />
                </>
              ) : (
                <GeneratePlaylist
                  selectedRecommendations={selectedRecommendations}
                  accessToken={accessToken}
                  userData={userData}
                />
              )}
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
}
