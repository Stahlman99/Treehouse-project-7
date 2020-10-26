import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


import '../App.css';
import SearchForm from './SearchForm'
import Nav from './Nav'
import PhotoContainer from './PhotoContainer'
import apiKey from '../config.js';
import NotFound from './NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <SearchForm />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <PhotoContainer apiKey={apiKey}/>} query=""/>
          <Route path="/cats" render={() => <PhotoContainer apiKey={apiKey} query="cats"/>}/>
          <Route path="/dogs" render={() => <PhotoContainer apiKey={apiKey} query="dogs"/>}/>
          <Route path="/computers" render={() => <PhotoContainer apiKey={apiKey} query="computers"/>}/>
          <Route path="/search" render={() => <PhotoContainer apiKey={apiKey}/>} query=""/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
