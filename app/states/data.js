import { create } from "zustand";

export const useDataStore = create((set) => ({
  accessToken: "",
  userData: null,
  topArtistsData: null,
  topArtistsExtendedData: {
    short_term: null,
    medium_term: null,
    long_term: null,
  },
  topTracksData: null,
  topTracksExtendedData: {
    short_term: null,
    medium_term: null,
    long_term: null,
  },
  playlistsData: null,
  recommendationsData: null,
  loading: true,
  setAllData: (data) => set(data),
  setLoading: (loading) => set({ loading }),
}));
