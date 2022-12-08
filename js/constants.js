const API_KEY = '4f70fbbd83d33d1c2444b3928bc7b1df';
const BASE_URL = 'https://api.themoviedb.org/3';

const MOVIES_URL = `${BASE_URL}/movie`;
const TV_SHOWS_URL = `${BASE_URL}/tv`;
const PEOPLE_URL = `${BASE_URL}/person`;
const SEARCH_URL = `${BASE_URL}/person`;

export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';

export const TOP_RATED_MOVIES = `${MOVIES_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
export const UPCOMING_MOVIES = `${MOVIES_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
export const NOW_PLAYING_MOVIES = `${MOVIES_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

export const POPULAR_MOVIES = `${MOVIES_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const POPULAR_TV_SHOWS = `${TV_SHOWS_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const POPULAR_PEOPLE = `${PEOPLE_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const SEARCH = `${SEARCH_URL}/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=true`;
