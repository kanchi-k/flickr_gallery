import React, { useState, useEffect } from "react";
import apiCall from "./apiCall";
import "./HomePage.css";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");
  const [isGrid, setIsGrid] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    fetch(apiCall + page)
      .then((res) => res.json())
      .then((data) => {
        let imgArr = data.photos.photo;
        setImages(imgArr);
      });
  }, [page]);

  const goToPageFn = (e) => {
    setGoToPage(e.target.value);
  };

  const slideshowOn = () => {
    setIsGrid(false);
    setInterval(() => {
      setSlideIndex((index) => index + 1);
    }, 1000);
  };

  return (
    <div>
      <h1>Flickr Gallery</h1>
      {isGrid ? (
        <div>
          <button
            className="left_side"
            style={{ display: "block" }}
            onClick={() => slideshowOn()}
          >
            View Slideshow
          </button>
          {images.map((image) => {
            return (
              <div className="tooltip">
                <img
                  className="image"
                  alt="pics"
                  src={
                    "https://live.staticflickr.com/" +
                    image.server +
                    "/" +
                    image.id +
                    "_" +
                    image.secret +
                    ".jpg"
                  }
                  key={image.id}
                />
                <span class="tooltiptext">
                  {"https://live.staticflickr.com/" +
                    image.server +
                    "/" +
                    image.id +
                    "_" +
                    image.secret +
                    ".jpg"}
                </span>
              </div>
            );
          })}
          <br />
          <h5 style={{ color: "white" }}>{`${page} of ${images.length}`}</h5>
          <div className="buttons">
            <div className="left_side">
              <input type="number" onChange={(e) => goToPageFn(e)} />
              <button onClick={() => setPage(goToPage)}>Go</button>
            </div>

            <div className="right_side">
              <button onClick={() => setPage(page - 1)}>Previous</button>
              <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Slideshow</h1>
          <button style={{ display: "block" }} onClick={() => setIsGrid(true)}>
            View Grid
          </button>

          <img
            className="slideshow_image"
            alt="pics"
            src={
              "https://live.staticflickr.com/" +
              images[slideIndex].server +
              "/" +
              images[slideIndex].id +
              "_" +
              images[slideIndex].secret +
              ".jpg"
            }
            key={images[slideIndex].id}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
