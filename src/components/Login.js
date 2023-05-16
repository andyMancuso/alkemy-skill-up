import axios from "axios"
import swAlert from "@sweetalert/with-react"
import { useNavigate, Navigate } from "react-router-dom"
import { useEffect } from 'react'

import '../css/login.css';

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (email === '' || password === '') {
      swAlert(
        <h2 style={{color:'red'}}>Los campos no pueden estar vacíos</h2>
      )
      return
    }
    
    if (email !== '' && !regexEmail.test(email) ) {
      swAlert(
        <h2 style={{color:'red'}}>El e-mail no es válido</h2>
      )
      return
    }

    if (email !== 'challenge@alkemy.org' || password !== 'react') {
      swAlert(
        <h2 style={{color:'red'}}>Las credenciales son invalidas</h2>
      )
      return
    }

    axios
      .post('http://challenge-react.alkemy.org', {email, password})
      .then(res => {
        swAlert(<h2 style={{color:'green'}}>Perfecto, ingresaste correctamente</h2>)
        const tokenRecibido = res.data.token
        sessionStorage.setItem('token', tokenRecibido)
        navigate('/listado')
      })
  }

  let token = sessionStorage.getItem('token')
  
  useEffect(() => {
    !token && navigate('/') 
  }, [token, navigate])

  return (
    <>
    {token !== null ? 
    <Navigate to='/listado' />
    :
    <div className="wrapper">
      <h2>Formulario de Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-Mail:</span>
          <input autoComplete="on" type='text' name='email' />
        </label>
        <label>
          <span>Password:</span>
          <input type='password' name='password' />
        </label>
        <button type='submit'>Log In</button>
      </form>
    </div>
    }
    </>
  )
}

export default Login