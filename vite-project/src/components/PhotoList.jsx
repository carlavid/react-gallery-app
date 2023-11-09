import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Photo from "./Photo";
import NotFound from "./NotFound";

const PhotoList = ({ data, currentQuery, handleQueryChange }) => {
  const location = useLocation();
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      if (query !== currentQuery) {
        handleQueryChange(query);
      }
    } else {
      const pathname = location.pathname.slice(1);
      if (pathname !== currentQuery) {
        handleQueryChange(pathname);
      }
    }
  }, [query, currentQuery, handleQueryChange, location]);

  let photos;
  if (data.length > 0) {
    photos = data.map((photo) => (
      <Photo
        url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
        key={photo.id}
      />
    ));
  } else {
    photos = <NotFound />;
  }

  return (
    <div className="photo-container">
      <h2>{currentQuery} Results</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
