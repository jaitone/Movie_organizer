import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import '../styles/navbar.css';
const helpers = require("./helpers");

function AddMovie() {

  const [hidden, setHidden] = useState(false)
  const [movieToAdd, setMovieToAdd] = useState({
    film_name: "",
    img_url: "",
    release_year: 0,
    summary: "",
    director: "",
    genre: "",
    rating: 0,
    film_runtime: 0,
    meta_score: 0
  })


  const addNewMovie = (movie) => {
    console.log(movie)
    fetch("https://moviebe.herokuapp.com/submit_film", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie)
    })
      .then(response => response.json())
      .then(refreshPage)
      .catch(error => {
        console.error("Errorcito:", error);
      })
      .catch(err => console.log(err));
  }


  const refreshPage = () => {
    window.location.reload(false);
  }


  const openForm = () => {
    setHidden(!hidden)
  }

  const handleAddNewMovie = () => {
    const errors = helpers.validate(movieToAdd)
    if (errors) return "There is some error";
    addNewMovie(movieToAdd)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setMovieToAdd(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="add-movie-form">

      <button className="btn add-button" onClick={openForm}>
        <h4>
          Add Movie
        </h4>
          </button>

      <Modal isOpen={hidden} toggle={openForm} >
        <h1>Login</h1>
        <label >Film name</label>
        <input
          type="text"
          placeholder="Enter film name"
          value={movieToAdd.film_name}
          name="film_name"
          onChange={handleChange}
          required />
        <label >Image URL</label>
        <input
          type="text"
          placeholder="Enter img url"
          value={movieToAdd.img_url}
          name="img_url"
          onChange={handleChange}
          required />
        <label >Release Year</label>
        <input
          type="text"
          placeholder="Enter release year"
          value={movieToAdd.release_year}
          name="release_year"
          onChange={handleChange}
          required />
        <label >Summary</label>
        <input
          type="textarea"
          placeholder="Enter Summary"
          value={movieToAdd.summary}
          name="summary"
          onChange={handleChange}
          required />
        <label>Director</label>
        <input
          type="text"
          placeholder="Enter Director"
          value={movieToAdd.director}
          name="director"
          onChange={handleChange}
          required />
        <label >Genre</label>
        <input
          type="text"
          placeholder="Enter Genre"
          value={movieToAdd.genre}
          name="genre"
          onChange={handleChange}
          required />
        <label >Rating</label>
        <input
          type="text"
          placeholder="Enter rating"
          value={movieToAdd.rating}
          name="rating"
          onChange={handleChange}
          required />
        <label >Film runtime</label>
        <input
          type="text"
          placeholder="Enter film duration in min"
          value={movieToAdd.film_runtime}
          name="film_runtime"
          onChange={handleChange}
          required />
        <label >Score</label>
        <input
          type="text"
          placeholder="Enter score"
          value={movieToAdd.meta_score}
          name="meta_score"
          onChange={handleChange}
          required />
        <button type="submit" onClick={handleAddNewMovie}>Add Movie</button>
        <button type="button" onClick={openForm}>Close</button>

      </Modal>
    </div>
  )
}

export default AddMovie