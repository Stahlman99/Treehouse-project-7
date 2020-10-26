import React, { Component } from 'react';
import {
  BrowserRouter,
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
      computerPics: []
    }
  }
  

  fetchData = (query) => {
    let response;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      response = res.data.photos.photo;
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    return response
  }

  componentDidMount() {
    this.setState({
      catPics: this.fetchData('cat'),
      dogPics: this.fetchData('dog'),
      computerPics: this.fetchData('computer')
    });
  }

  render() {
    console.log(this.state.catPics);
    
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <PhotoContainer />}/>
            <Route path="/cats" render={() => <PhotoContainer data={this.state.catPics}/>}/>
            <Route path="/dogs" render={() => <PhotoContainer data={this.state.dogPics}/>}/>
            <Route path="/computers" render={() => <PhotoContainer data={this.state.computerPics}/>}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
