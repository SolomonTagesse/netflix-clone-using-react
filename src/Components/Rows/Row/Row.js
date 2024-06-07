import React, { useEffect, useState } from "react";
import "./Row.css";
//import axios from "axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
//const API_KEY = process.env.REACT_APP_apikey;
// {
//   title, fetchUrl, isLargeRow;
// }
const Row = (props) => {
  const [movies, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    fetch(`https:api.themoviedb.org/3${props.fetchUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovie(data.results);
        console.log(data);
      });
  }, [props.fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
        (url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log(urlParams);
          // console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        }
      );
    }
  };

  const opts = {
    height: "550",
    width: "70%",
    display: "flex",
    justifyContent: "center",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{props.title}</h1>
      <div className="row__posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.name}
            className={`row__posterLarge`}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};
export default Row;
