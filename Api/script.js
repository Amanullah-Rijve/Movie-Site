const FetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "False") throw new Error(data.Error);
    return data;
  } catch (error) {
    console.error("OMDB API Error:", error.message);
    return null;
  }
};

export const getData = async (category) => {
  const apiKey = "b8d8c170";
  return FetchData(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(category)}`
  );
};

export const searchData = async (query) => {
  const apiKey = "b8d8c170";
  return FetchData(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
  );
};

export const idOfData = async (id) => {
  const apiKey = "b8d8c170";
  return FetchData(
    `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(id)}`
  );
};
