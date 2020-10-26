import React, { Component } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios'

import '../App.css';
import SearchForm from './SearchForm'
import Nav from './Nav'
import PhotoContainer from './PhotoContainer'
import apiKey from '../config.js';
import NotFound from './NotFound'

class App extends Component {
  

  constructor() {
    super();
    this.state = {
      catPics: [],
      dogPics: [],
      computerPics: [],
      searchRes: []
    }
  }
  

  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&sort=relevance&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        catPics: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&sort=relevance&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        dogPics: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computer&sort=relevance&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        computerPics: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&sort=relevance&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      console.log(res.data.photos.photo);
      this.setState({
        searchRes: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
    this.context.history.push('/search')
  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={() => this.performSearch}/>
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/cats'/>}/>
            <Route path="/search" render={() => <PhotoContainer title='Search Results'data={this.state.searchRes}/>}/>
            <Route path="/cats" render={() => <PhotoContainer title='Cats' data={this.state.catPics}/>}/>
            <Route path="/dogs" render={() => <PhotoContainer title='Dogs'data={this.state.dogPics}/>}/>
            <Route path="/computers" render={() => <PhotoContainer title='Computers'data={this.state.computerPics}/>}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
