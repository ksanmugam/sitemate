import axios from "axios";
import Constants from "expo-constants";

const getArticles = async (query: string) => {
  try {
    const response = await axios.get(
      `${Constants.expoConfig?.extra?.baseUrl}`,
      {
        params: {
          q: query,
          apiKey: Constants.expoConfig?.extra?.apiKey,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    // Handle different response status codes
    if (err.response) {
      switch (err.response.status) {
        case 400:
          throw new Error("Bad Request: Please check your query.");
        case 401:
          throw new Error("Unauthorized: Please log in.");
        case 429:
          throw new Error("Too Many Requests: Please wait and try again.");
        case 500:
          throw new Error("Internal Server Error: Please try again later.");
        default:
          throw new Error(
            `Unexpected Error: ${err.response.statusText} (${err.response.status})`
          );
      }
    } else if (err.request) {
      throw new Error("No response from the server. Please try again later.");
    } else {
      throw new Error(`Request Error: ${err.message}`);
    }
  }
};

const getArticlesByPage = async (query: string, pageParam: number | 1) => {
  try {
    const response = await axios.get(
      `${Constants.expoConfig?.extra?.baseUrl}`,
      {
        params: {
          q: query,
          apiKey: Constants.expoConfig?.extra?.apiKey,
          page: pageParam,
        },
      }
    );
    console.log("calling here");
    return response.data;
  } catch (err: any) {
    // Handle different response status codes
    if (err.response) {
      switch (err.response.status) {
        case 400:
          throw new Error("Bad Request: Please check your query.");
        case 401:
          throw new Error("Unauthorized: Please log in.");
        case 429:
          throw new Error("Too Many Requests: Please wait and try again.");
        case 500:
          throw new Error("Internal Server Error: Please try again later.");
        default:
          throw new Error(
            `Unexpected Error: ${err.response.statusText} (${err.response.status})`
          );
      }
    } else if (err.request) {
      throw new Error("No response from the server. Please try again later.");
    } else {
      throw new Error(`Request Error: ${err.message}`);
    }
  }
};

export default {
  getArticles,
  getArticlesByPage,
};
