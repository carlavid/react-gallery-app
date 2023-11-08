import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import PhotoList from "./components/PhotoList";
import NotFound from "./components/NotFound";
import apiKey from "./config";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("cats");
  const [loading, setLoading] = useState(true);

  const fetchData = (queryParam) => {
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${queryParam}&per_page=24&format=json&nojsoncallback=1`;
    setLoading(true);
    let activeFetch = true;

    axios
      .get(apiUrl)
      .then((response) => {
        if (activeFetch) {
          setPhotos(response.data.photos.photo);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
    return () => {
      activeFetch = False;
    };
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  return (
    <div className="container">
      <SearchForm changeQuery={handleQueryChange} />
      <Nav onClick={fetchData} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="/cats" />} />
          <Route path="cats" element={<PhotoList data={photos} />} />
          <Route path="dogs" element={<PhotoList data={photos} />} />
          <Route path="computers" element={<PhotoList data={photos} />} />
          <Route path="/search/:query" element={<PhotoList data={photos} />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="*" element={<Navigate replace to="/404" />} /> */}
        </Routes>
      )}
    </div>
  );
};

export default App;
