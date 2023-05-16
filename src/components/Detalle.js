import { Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from "axios";
import swAlert from '@sweetalert/with-react'

const Detalle = () => {

  const [movie, setMovie] = useState(null)

  const navigate = useNavigate()

  let token = sessionStorage.getItem('token')

  useEffect(() => {
    !token && navigate('/') 
  }, [token, navigate])


  let query = new URLSearchParams(window.location.search)
  let movieID = query.get('movieID')

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=6a87064f2bc1ec0f880a284d5142027f&language=en-US`

    axios
      .get(endPoint)
      .then(res => {
        const APIdata = res.data
        setMovie(APIdata)
        console.log(APIdata)
      })
      .catch(error => {
        swAlert(<h2 style={{color:'red'}}>Hubo errores, intenta más tarde</h2>)
      })
  }, [movieID])


  return (
    <>
      {!movie && <p>Cargando...</p>}
      {token === null
        ? <Navigate to={'/'} />
        : movie && (
          <>
            <div className="row">
              <h1>{movie.title}</h1>
                <div className="col-4">
                  <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Card cap" />
                </div>           
              <div className="col-8">
                <h3>Overview:</h3>
                <p>{movie.overview}</p>
                <h3>Genres:</h3>
                <ul>
                <li>genero 1</li>
                <li>genero 2</li>
                </ul> 
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Detalle