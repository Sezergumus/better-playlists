"use client";

import Header from "./components/Header";
import { useEffect } from "react";
import fetcher from "@/app/util/fetch";
import userDataSetter from "@/app/util/userDataSetter";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import Playlists from "./components/Playlists";
import LogInButton from "./components/LogInButton";
import { useDataStore } from "./states/data";
import Loading from "./components/Loading";

export default function Home() {
  const {
    accessToken,
    userData,
    topArtistsData,
    topTracksData,
    playlistsData,
    setAllData,
    loading,
  } = useDataStore();

  // if loading is true for more than 0.5 seconds, set it to false
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setAllData({
          loading: false,
        });
      }, 500);
    }
  }, [loading]);

  useEffect(() => {
    if (window.location.hash && !accessToken) {
      const hash = window.location.hash
        .substring(1) // remove the #
        .split("&") // split into separate params
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value;
          return params;
        }, {});

      document.cookie = `access_token=${hash.access_token};max-age=3600`;

      setAllData({
        accessToken: hash.access_token,
      });
    }

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
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    if (!userData) {
      userDataSetter(accessToken);
    }

    if (!topTracksData || !topArtistsData || !playlistsData) {
      fetcher(
        "https://api.spotify.com/v1/me/top/tracks?limit=5",
        accessToken,
        "topTracksData"
      );
      fetcher(
        "https://api.spotify.com/v1/me/top/artists?limit=5",
        accessToken,
        "topArtistsData"
      );
      fetcher(
        "https://api.spotify.com/v1/me/playlists?limit=50",
        accessToken,
        "playlistsData"
      );
    }
  }, [accessToken]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header activePage={"dashboard"} />
          {accessToken ? (
            <>
              {topArtistsData && topTracksData && playlistsData ? (
                <>
                  <TopArtists data={topArtistsData.items} />
                  <TopTracks data={topTracksData.items} />
                  <Playlists
                    playlists={playlistsData.items}
                    username={userData.display_name}
                  />
                </>
              ) : null}
            </>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold">
                  Welcome to BetterPlaylists
                </h1>
                <p className="text-xl mb-4">
                  Please login to your Spotify account to continue
                </p>
                <LogInButton buttonText={"Sign In"} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
