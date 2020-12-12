import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import api from '../../services/api'
import { cpfMask } from '../../utils/inputMaks';
import { checkCpf } from '../../utils/cpfValidator';

import "./styles.css";

import logoImg from "../../../src/logo.png";

//validação do formulário com yup
const schema = Yup.object().shape({
  name: Yup.string().required("O campo nome é obrigatório"),
  cpf: Yup.string().required("O campo cpf é obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .required("O campo email é obrigatório"),
    password: Yup.string().required("O campo senha é obrigatório"),
});

export default function Cadastro({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    if(checkCpf(cpf)) {
      const emailExists = await api.get(`users/check-email?email=${email}`);
      
      if(emailExists.data.result){
        alert(`O email ${email} já está cadastrado, tente novamente.`);
        return false;
      }
      const cpfExists = await api.get(`users/check-cpf?cpf=${cpf}`);

      if(cpfExists.data.result){
        alert(`O cpf ${cpf} já está cadastrado, tente novamente.`);
        return false;
      }
      await api.post('./users', {
        name,
        email,
        cpf,
        password,
      });
  
      history.push('/');
    } else {
      alert(`O CPF ${cpf} é inválido, tente novamente.`);
    }
  }

  const handleCpfMask = (e) => {
    cpfMask(e);
    setCpf(e.target.value);
  };

  return (
    <div className="signup-container">
      <div className="container">
        <p>
          <img src={logoImg} alt="logo" />
        </p>
        <div className="signup">
          <p className="title">
            <strong>Faça o seu cadastro</strong>
          </p>

          <Form onSubmit={handleSubmit} schema={schema} autoComplete="off">
            <label htmlFor='name'>Nome *</label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='Digite o seu nome'
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <label htmlFor='email'>E-mail *</label>
            <Input
              type='email'
              id='email'
              name='email'
              placeholder='Digite o seu email'
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <label htmlFor='cpf'>CPF *</label>
            <Input
              id='cpf'
              name='cpf'
              placeholder='Digite apenas os números'
              value={cpf}
              onChange={handleCpfMask}
            />
            <label htmlFor='password'>Senha *</label>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder='Digite a sua senha'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />

            <button className="btn" type="submit">Cadastrar</button>
            <p className="link">
              <Link to="/">Voltar para página de login</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}