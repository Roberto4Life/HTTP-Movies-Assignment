import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

export default function UpdateMovie(props) {

    const [movie, setMovie] = useState([initialMovie]);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log('edit get', res)
                setMovie(res.data)
            })
            .catch(err => {
                console.log('getting editing data error', err)
            })
    }, [id])

    const handleChanges = e => {
        if (e.target.name === 'stars') {
            console.log(e.target.value.split(','))
            setMovie({...movie,[e.target.name]: e.target.value.split(',')})
        } else {
            console.log(e.target.name)
        setMovie({...movie,[e.target.name]: e.target.value});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then((res) => {
            console.log("bk: UpdateForm.js: submit success: res: ", res);
            setMovie(res.data);
            push('/')
            window.location.reload(true)
          })
          .catch((err) =>
            console.error("Error editing", err)
          );
      };

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder={movie.title}
                    value={movie.title}
                />
                <div />
                <input
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder={movie.director}
                    value={movie.director}
                />
                <div />
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder={movie.metascore}
                    value={movie.metascore}
                />
                <div />
                <input
                    type="text"
                    name="stars"
                    onChange={handleChanges}
                    placeholder={movie.stars}
                    value={movie.stars}
                />
                <div />
                <button>Update</button>
            </form>
        </div>
    )
}