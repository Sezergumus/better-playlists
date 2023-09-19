import { useDataStore } from "../states/data";

const fetcher = (url, accessToken, setState, func) => {
  const { setAllData, setLoading } = useDataStore.getState();
  setLoading(true);

  return fetch(url, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setAllData({
        [setState]: data,
      });
      setLoading(false);
      if (func) {
        func(data);
      }
    });
};

export default fetcher;
