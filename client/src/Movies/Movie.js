import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import UpdateMovie from './UpdateMovie';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const params = useParams();

  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('Deleting Movie', res)
        push('/')
        window.location.reload(true)
      })
      .catch((err) => console.log(err));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <UpdateMovie movie={movie} />
      <div
        className='update-button'
        onClick={() => push(`/update-movie/${params.id}`)}>
        Update
      </div>
      <div
        className='delete-button'
        onClick={() => deleteMovie(params.id)}
        >
        Delete
      </div>
    </div>


  );
}

export default Movie;
