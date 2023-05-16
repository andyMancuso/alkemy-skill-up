import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import swAlert from '@sweetalert/with-react';


const Listado = () => {

  const [ moviesList, setMovieslist] = useState([])

  const navigate = useNavigate()

  let token = sessionStorage.getItem('token')
  

  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=6a87064f2bc1ec0f880a284d5142027f&language=en-US&/page=1'
    axios
    .get(endPoint)
    .then(res => {
      const APIdata = res.data
      setMovieslist(APIdata.results)
    })
    .catch(error => {
      swAlert(<h2 style={{color:'red'}}>Hubo errores, intenta más tarde</h2>)
    })
  }, [])

  
  useEffect(() => {
    !token && navigate('/') 
  }, [token, navigate])

  return (
    <>
      {token === null
       ? <Navigate to={'/'} /> 
       : <div className="row">
          {
            moviesList.map((singleMovie, idx) => {
              return (
                <div className="col-3" key={idx}>
                  <div  className="card my-4">
                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`} alt="Card cap" />
                      <div className="card-body">
                        <h5 className="card-title">{singleMovie.title.substring(0, 30)}...</h5>
                        <p className="card-text">{singleMovie.overview.substring(0, 100)}...</p>
                        <Link to={`/detalle?movieID=${singleMovie.id}`} className="btn btn-primary">View detail</Link>
                      </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </>
  )
}

export default Listado