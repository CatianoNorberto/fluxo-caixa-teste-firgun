import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api'
import "./styles.css";
import logoImg from "../../../src/logo.png";

export default function Login({ history }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email, password
    }
    try {
      const response = await api.post('/sessions', data);
      localStorage.setItem("user_id", response.data.id);
      history.push('/home');
    } catch (error) {
      alert("Email ou senha incorretos, tente novamente");
      setPassword("");
      console.log(error);
    }

  }

  return (
    <div className="login-container">
      <div className="container">
        <img src={logoImg} alt="logo" />
        <div className="login">
          <p className="title">
            <strong>Faça o seu login</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>E-mail *</label>
            <input
              type='email'
              id='email'
              placeholder='Digite o seu email'
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <label htmlFor='password'>Senha *</label>
            <input
              type='password'
              id='password'
              placeholder='Digite a sua senha'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />

            <button className="btn" type="submit">Entrar</button>
            <p className="link">
              Ainda não é cadastrado? <Link to="/signup">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}