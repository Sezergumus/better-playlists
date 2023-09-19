import React from "react";
import Link from "next/link";

export default function LogInButton({ buttonText }) {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "https://betterplaylists.sezergumus.dev";
  const clientId = "a338ac7473534abcb3c7b9eacfdd3989";

  const scopes = [
    "user-top-read",
    "user-read-private",
    "user-read-email",
    "playlist-read-collaborative",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <Link
      href={loginUrl}
      className="bg-bgSpotify hover:bg-bgSpotifyHover text-white font-bold py-2 px-4 rounded inline-block"
    >
      {buttonText}
    </Link>
  );
}
