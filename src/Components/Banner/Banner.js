import React, { useEffect, useState } from "react";
import "./Banner.css";
const API_KEY = process.env.REACT_APP_apikey;
const Banner = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetch(
      `https:api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      });
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;

// (async () => {
//   try {
//     const request = await axios.get(
//       `http://localhost:4000/api/fetchNetflixOriginals`
//     );
//     setMovie(
//       request.data.results[
//         Math.floor(Math.random() * request.data.results.length)
//       ]
//     );
//   } catch (error) {
//     console.log("error", error);
//   }
// })();
