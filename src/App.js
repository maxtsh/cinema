import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/pages/Home';
import Discover from './components/pages/Discover';
import TopRated from './components/pages/TopRated';
import Upcoming from './components/pages/Upcoming';
import NowPlaying from './components/pages/NowPlaying';
import MovieByGenre from './components/pages/MovieByGenre';
import Movie from './components/pages/Movie';
import MovieSearch from './components/pages/MovieSearch';
import Person from './components/pages/Person';

// Main CSS Style
import './styles/scss/main.css';
// Bootstrap 4.3
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/discover/popular' component={Discover} />
          <Route exact path='/discover/top_rated' component={TopRated} />
          <Route exact path='/discover/upcoming' component={Upcoming} />
          <Route exact path='/discover/now_playing' component={NowPlaying} />
          <Route exact path='/genres/:name/:id' component={MovieByGenre} />
          <Route exact path='/movie/:id' component={Movie} />
          <Route exact path='/search/:movie/' component={MovieSearch} />
          <Route exact path='/person/:id' component={Person} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
