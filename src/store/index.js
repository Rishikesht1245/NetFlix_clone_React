import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

//initial states
const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  isLoading: false,
};

//function for fetching genres (asyncThunk --> action type and function)
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    //destructuring genres present inside genres
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  console.log(genres);
  // will be the action.payload
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  console.log(array);
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      //finding the name of the genre from the with matching id present in genres array
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    //backdrop_path is the paster and we only need movies with posters
    // pushing the movies to the movies array with genres
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        // same movie will be in multiple genres, taking only three among them
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    // destructuring results nested inside data and which is nested inside the response given by axios
    // inside results movies details will be present
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

/* =========== FETCH MOVIES FLOW ====================================================================================================
1. Inside the fetchMovies functions we call the getRawData function
     a. which accepts three parameters the api, genres(accessed using getState()) and paging
     b. Inside the getRawData function it will loop for minimum 60 movies and i = 10
     c. also it is fetching data from api using axios and calls the createArrayFromRawData()
     d. which accepts three parameters the fetched result, movies Array (empty in init case) and genres (got from fetch Movies)
     e. inside createArrayFromRawData() we push the movies to array with id genre name and image (if backdrop_path is there (image))
======================================================================================================================================*/

export const fetchMovies = createAsyncThunk(
  "/netflix/trending",
  //the second argument is provided by asyncthunk itself with that we can access the slice
  async ({ type }, thunkApi) => {
    //destructuring genres thunk using the getState function
    const {
      netflix: { genres },
    } = thunkApi.getState();
    // invoking getRawData function
    const data = await getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
    console.log("Movies");
    console.log(data);
    return data;
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "/netflix/moviesByGenre",
  //the second argument is provided by async thunk itself with that we can access the slice
  async ({ genre, type }, thunkApi) => {
    //destructuring genres thunk using the getState function
    const {
      netflix: { genres },
    } = thunkApi.getState();
    // invoking getRawData function
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
    console.log("Movies");
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    // case and reducer function
    builder.addCase(getGenres.fulfilled, (state, action) => {
      //setting genres state value when the getGenres function is fulfilled
      state.genres = action.payload;
      state.genresLoaded = true;
    });

    // case for fetchDataByGenre
    builder.addCase(fetchDataByGenre.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
    });

    //case for fetchMovies
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
    });
  },
});

// store will be passed inside the provider in the index file
export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
