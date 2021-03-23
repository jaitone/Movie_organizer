import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import '../styles/deleteMovie.css';


function DeleteMovie(props) {
  const { movieId } = props
  const [hidden, setHidden] = useState(false)


  const deleteMovieConfirmation = () => {
    setHidden(!hidden)
  }

  const deleteMovie = () => {
    fetch(`https://moviebe.herokuapp.com/delete_film/${movieId}`, {
      method: "Delete"
    })
      .then(response => response.json())
      .then(refreshPage)
      .catch(error => {
        console.error("Errorcito:", error);
      });
  }

  const refreshPage = () => {
    window.location.reload(false);
  }



  return (

    <div className="delete">
      {movieId ?
        <button
          className="btn delete-button"
          onClick={deleteMovieConfirmation}>
          Delete movie
    </button> : null
      }
      <Modal className="modal-box" isOpen={hidden} toggle={deleteMovieConfirmation} >
        <label className="title-box">Are you sure?</label>
        <button className="btn confirm-delete-button" onClick={deleteMovie}>Delete movie </button>
        <button className="btn confirm-delete-button" onClick={deleteMovieConfirmation}>Cancel </button>
      </Modal>
    </div>

  )

}


export default DeleteMovie