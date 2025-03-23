import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

export const GetPlaceDetails = async (data) => {
  return axios.post(BASE_URL, data, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'places.photos.name,places.displayName', // 👈 REQUIRED
    }
  });
};
