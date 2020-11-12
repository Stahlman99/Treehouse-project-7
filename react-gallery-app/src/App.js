// Import packages
import React, { Component } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// Imports pexels
import { createClient } from 'pexels';

// Import Components
import './App.css';
import SearchForm from './components/SearchForm'
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer'
import apiKey from './config.js';
import NotFound from './components/NotFound'

// Initialize client
const client = createClient(apiKey);

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
    client.photos.search({ query: 'cats', locale: 'en-US', per_page: 24 }).then(res => {
      this.setState({
        catPics: res.photos
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    client.photos.search({ query: 'dogs', locale: 'en-US', per_page: 24 }).then(res => {
      this.setState({
        dogPics: res.photos
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    client.photos.search({ query: 'computers', locale: 'en-US', per_page: 24 }).then(res => {
      this.setState({
        computerPics: res.photos
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  // This method fetches the data for a custom query.
  performSearch = (query) => {
    this.setState({
      searchRes: undefined
    });
    client.photos.search({ query: query, locale: 'en-US', per_page: 24 }).then(res => {
      this.setState({
        searchRes: res.photos
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
