const getArtistGenres = (accessToken, artistIDs) => {
  const query = artistIDs.join(",");

  return fetch(`https://api.spotify.com/v1/artists?ids=${query}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // get the mostly repeating 2 genres
      const genres = data.artists.map((artist) => artist.genres).flat();

      const genresCount = {};
      genres.forEach((genre) => {
        if (genresCount[genre]) {
          genresCount[genre]++;
        } else {
          genresCount[genre] = 1;
        }
      });

      // if there are same amount of genres, return the first one
      const sortedGenres = Object.keys(genresCount).sort(
        (a, b) => genresCount[b] - genresCount[a]
      );

      return sortedGenres.slice(0, 2);
    });
};

export default getArtistGenres;
