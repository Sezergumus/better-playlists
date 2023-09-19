import { useDataStore } from "../states/data";

const fetcherExtended = (url, accessToken, setState, timeRange) => {
  const { setAllData, setLoading } = useDataStore.getState();
  setLoading(true);

  fetch(url, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setAllData((state) => ({
        ...state,
        [setState]: {
          ...state[setState],
          [timeRange]: data,
        },
      }));
      setLoading(false);
    });
};

export default fetcherExtended;
