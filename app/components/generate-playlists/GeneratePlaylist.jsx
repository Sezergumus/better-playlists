import React, { useState } from "react";

export default function GeneratePlaylist({
  accessToken,
  selectedRecommendations,
  userData,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    privacy: "public",
  });

  const handleSubmit = () => {
    if (!form.name) {
      alert("Please enter a playlist name");
      return;
    }

    fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        ...(form.description && { description: form.description }),
        public: form.privacy === "public" ? true : false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const playlistId = data.id;
        const uris = selectedRecommendations.map((track) => track.uri);

        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: uris,
          }),
        })
          .then((res) => {
            if (res.status === 201) {
              alert("Playlist created successfully!");
              window.open(data.external_urls.spotify, "_blank");
              window.location.href = "/";
            }
          })
          .catch((err) => {
            console.log(err);
            alert("There was an error creating the playlist");
          });
      });
  };

  return (
    <div className="generate-playlist-container w-full mt-12">
      <div className="generate-playlist-inner-container w-fit max-w-[90%] mx-auto">
        <form className="flex flex-col gap-4">
          <label htmlFor="playlist-name" className="text-bgPrimary text-lg">
            Playlist Name
          </label>
          <input
            type="text"
            name="playlist-name"
            id="playlist-name"
            className="border-2 border-bgPrimary rounded-md p-2"
            placeholder="My Coolest Playlist!"
            maxLength={200}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
          <label
            htmlFor="playlist-description"
            className="text-bgPrimary text-lg"
          >
            Playlist Description
          </label>
          <textarea
            name="playlist-description"
            id="playlist-description"
            maxLength={512}
            className="border-2 border-bgPrimary rounded-md px-2 py-1"
            placeholder="My coolest playlist's coolest description!"
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
          />

          <label htmlFor="playlist-privacy" className="text-bgPrimary text-lg">
            Playlist Privacy
          </label>
          <select
            name="playlist-privacy"
            id="playlist-privacy"
            className="border-2 border-bgPrimary rounded-md p-2 text-bgPrimary"
            value={form.privacy}
            onChange={(e) => {
              setForm({ ...form, privacy: e.target.value });
            }}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <button
            type="submit"
            className="bg-bgPrimary text-white text-lg font-bold rounded-md px-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Generate Playlist
          </button>
        </form>
      </div>
    </div>
  );
}
