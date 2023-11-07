import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
import './App.css';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import apiKey from './config';
   

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("birds");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        // handle success
        if (activeFetch) {
          setPhotos(response.data.photos.photo);
          setLoading(false);
        }
      })
      .catch(error => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
    return () => {activeFetch = false}
  }, [query]);

  const handleQueryChange = searchText => {
    setQuery(searchText);
  }

  return (
    <div className="container">
      <SearchForm changeQuery={handleQueryChange}/>
      <Nav />
      {
        (loading)
        ? <p>Loading...</p>
        : <PhotoList data={photos} />
      }
      <Routes>
        <Route path="/" element={App} />
        <Route path="cats" element={<PhotoList data={photos}/> } />
        <Route path="dogs" element={<PhotoList data={photos}/>} />
        <Route path="computers" element={<PhotoList data={photos}/>} />
        <Route path="/search/:query" element={<PhotoList data={photos}/>} />
      </Routes>
    </div>
  )
}

export default App
