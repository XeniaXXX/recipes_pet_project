import { API_URL } from "../utils/url.js";

export const getRecipes = async function () {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
