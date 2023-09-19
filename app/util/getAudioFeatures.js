const getAudioFeatures = (accessToken, trackIDs) => {
  const query = trackIDs.join(",");

  return fetch(`https://api.spotify.com/v1/audio-features?ids=${query}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // get the average of each feature
      const features = data.audio_features;
      const featuresAverage = {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        loudness: 0,
        speechiness: 0,
        tempo: 0,
      };

      features.forEach((feature) => {
        featuresAverage.acousticness += feature.acousticness;
        featuresAverage.danceability += feature.danceability;
        featuresAverage.energy += feature.energy;
        featuresAverage.loudness += feature.loudness;
        featuresAverage.speechiness += feature.speechiness;
        featuresAverage.tempo += feature.tempo;
      });

      for (const feature in featuresAverage) {
        featuresAverage[feature] = Math.round(
          (featuresAverage[feature] / features.length) * 100000
        );
        featuresAverage[feature] /= 100000;
      }

      return featuresAverage;
    });
};

export default getAudioFeatures;
