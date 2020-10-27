// Import packages
import React, { Component } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios'

// Import Components
import './App.css';
import SearchForm from './components/SearchForm'
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer'
import apiKey from './config.js';
import NotFound from './components/NotFound'

// This is the main component for our app.
class App extends Component {
  
  // App class constructor defines the state for use within our app.
  constructor() {
    super();
    this.state = {
      catPics: [],
      dogPics: [],
      computerPics: [],
      searchRes: undefined
    }
  }
  
  // This method sets the values of the three default search options when the component mounts.
  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&sort=relevance&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        catPics: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&sort=relevance&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        dogPics: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computer&sort=relevance&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        computerPics: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  // This method fetches the data for a custom query.
  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&sort=relevance&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        searchRes: res.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  // This method renders the components to the page.
  render() {
    
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/cats'/>}/>
            <Route path="/search" render={() => <PhotoContainer title='Search Results:'data={this.state.searchRes}/>}/>
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
