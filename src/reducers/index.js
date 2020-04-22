import { combineReducers } from 'redux';
import popularReducer from './popularReducer';
import genereReducer from './genereReducer';
import topRatedReducer from './topRatedReducer';
import upcomingReducer from './upcomingReducer';
import nowPlayingReducer from './nowPlayingReducer';
import mBGReducer from './mBGReducer';
import movieReducer from './movieReducer';
import movieCastReducer from './movieCastReducer';
import movieSearchReducer from './movieSearchReducer';
import movieVideosReducer from './movieVideosReducer';
import personReducer from './personReducer';
import recommendedMoviesReducer from './recommendedMoviesReducer';
import personMoviesReducer from './personMoviesReducer';


export default combineReducers({
    populars: popularReducer,
    genere: genereReducer,
    topRated: topRatedReducer,
    upcoming: upcomingReducer,
    nowPlaying: nowPlayingReducer,
    movieByGenre: mBGReducer,
    movie: movieReducer,
    movieCast: movieCastReducer,
    movieSearch: movieSearchReducer,
    movieVideos: movieVideosReducer,
    person: personReducer,
    recommendedMovies: recommendedMoviesReducer,
    personMovies: personMoviesReducer
});