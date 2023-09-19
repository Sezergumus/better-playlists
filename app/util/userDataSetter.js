import fetcher from "./fetch";
import { useDataStore } from "../states/data";

const userDataSetter = (accessToken) => {
  const { setAllData, setLoading } = useDataStore.getState();

  const setterFunc = (data) => {
    const userDataObject = {
      country: data.country,
      display_name: data.display_name,
      email: data.email,
      external_urls: data.external_urls,
      followers: data.followers,
      id: data.id,
      images: data.images,
      product: data.product,
      type: data.type,
    };

    setAllData({
      userData: userDataObject,
    });

    document.cookie = `user_data=${JSON.stringify(
      userDataObject
    )};max-age=3600`;
  };

  // check if user data cookie exists
  if (!document.cookie.includes("user_data")) {
    fetcher(
      "https://api.spotify.com/v1/me",
      accessToken,
      "userData",
      setterFunc
    );
  } else {
    // if exists, set user data
    const userDataCookie = document.cookie
      .split(";")
      .find((item) => {
        return item.includes("user_data");
      })
      .split("=")[1];

    setAllData({
      userData: JSON.parse(userDataCookie),
    });
  }
};

export default userDataSetter;
