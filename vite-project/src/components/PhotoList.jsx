import { useParams } from "react-router-dom";
import React from "react";
import Photo from "./Photo";
import NotFound from "./NotFound";

const PhotoList = props => {
  let { query } = useParams();
  const results = props.data;
  let photos;
  if (results.length > 0) {
    photos = results.map(photo => <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
  } else {
    photos = <NotFound />
  }

  return (
    <div className="photo-container">
      <h2>{query} Results</h2>
      <ul>
        {photos}
      </ul>
    </div>
  );
};

export default PhotoList;
