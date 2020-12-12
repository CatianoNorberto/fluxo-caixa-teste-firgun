import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaMoneyBillAlt } from 'react-icons/fa';

import './styles.css';

import Toolbar from '../../components/Toolbar';
import Modal from '../../components/UI/Modal/Modal';
import api from "../../services/api";

function Home() {
  const history = useHistory();

  let [totalinput, setTotalinput] = useState(0);
  let [totalexit, settotalexit] = useState(0);

  const [modalInput, setModalInput] = useState(false);
  const [modalInitial, setModalInitial] = useState(false);

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [input, setInput] = useState('');
  const [exit, setExit] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [date, setDate] = useState('');
  const [balance, setBalance] = useState('');
  const [loaded, setLoaded] = useState('');

  const [registration, setRegistration] = useState([]);

  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    if (!user_id) history.push("/");
    async function fetchData() {
      const balance =  await api.get('users/balance', {
        headers: {
          user_id,
        }
      });
      if(!balance.data) {
        setModalInitial(true);
      }else{
        setBalance(balance.data.balance);
      }

      const response = await api.get('/users/registrations', {
        headers: {
          user_id,
        }
      });
      setRegistration(response.data);
    }
    fetchData();
  }, [loaded, user_id, history])

  useEffect(() => {
    var total = 0
    const updateInputValues = () => {
      // eslint-disable-next-line array-callback-return
      registration.map(item => {
        total += (Number(item.input))
      })
      setTotalinput(total)
    }
    updateInputValues()

  }, [registration])

  useEffect(() => {
    var totaltotalexit = 0
    const updateExittValues = () => {
      // eslint-disable-next-line array-callback-return
      registration.map(item => {
        totaltotalexit += (Number(item.exit))
      })
      settotalexit(totaltotalexit)
    }
    updateExittValues()

  }, [registration])

  const purchaseCancelHandler = () => {
    setModalInput(false);
    setModalInitial(false);
  };

  const handleUpdateBalance = async (input, exit) => {
    try {
      await api.put('/users/balance', {
        balance: `${Number(input) - Number(exit)}`,
      }, {
        headers: {
          user_id
        }
      });
    } catch (error) {
      console.log(error);
      alert("Não atualizar o saldo");
    }
  };

  const handleInitialBalance = async (event) => {
    event.preventDefault();

    try {
      await api.post('/users/balance', {
        balance: initialBalance,
        date: initialDate,
      }, {
        headers: {
          user_id
        }
      });

      setLoaded(Math.random() * 100);
      setModalInitial(false);
      setInitialBalance("");
      setInitialDate("");
    } catch (error) {
      console.log(error);
      alert("Não inserir o saldo inicial");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      category,
      description,
      input,
      exit,
      date,
      user_id: Number(user_id),
      balance: `${totalinput - totalexit}`
    }
    try {
      await api.post('/users/registrations', data, {
        headers: {
          user_id
        }
      });
      setLoaded(Math.random() * 100);
      handleUpdateBalance(input, exit);
      purchaseCancelHandler();
      setCategory("");
      setDescription("");
      setInput("");
      setExit("");
      setDate("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Home">
      <Modal show={modalInput} modalClosed={purchaseCancelHandler} >
        <div className="modal-data">
          <h4>Cadastro de itens</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor='date'>Data *</label>
            <input 
              id="date" 
              type="date" 
              value={date}
              onChange={event => setDate(event.target.value)}
              />
            <label htmlFor='category'>Categoria *</label>
            <input
              type='text'
              id='category'
              name='category'
              placeholder='Digite a categoria desejada'
              value={category}
              onChange={event => setCategory(event.target.value)}
            />
            <label htmlFor='description'>Descrição *</label>
            <input
              type='text'
              id='description'
              name='description'
              placeholder='Qual é a descrição'
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
            <label htmlFor='input'>Entrada </label>
            <input
              type='number'
              id='number'
              name='input'
              placeholder='Digite apenas os números'
              value={input}
              onChange={event => setInput(event.target.value)}
            />
            <label htmlFor='exit'>Saída </label>
            <input
              type='number'
              id='number'
              name='exit'
              placeholder='Digite apenas os números'
              value={exit}
              onChange={event => setExit(event.target.value)}
            />
            <button className="btn-g" type="submit">Cadastrar</button>
          </form>
        </div>
      </Modal>

      <Modal show={modalInitial} modalClosed={() => true}>
        <div className="modal-data">
          <h4>Cadastrar saldo inicial</h4>
          <form onSubmit={handleInitialBalance}>
            <label htmlFor="userBalance">Informe seu saldo inicial:</label>
            <input 
              type="number" 
              id='userBalance'
              name='input'
              placeholder='Digite apenas os números'
              value={initialBalance}
              onChange={event => setInitialBalance(event.target.value)}
            />
            <label htmlFor="date">Informe a data inicial:</label>
            <input 
              type="date" 
              id='date'
              name='input'
              placeholder='Digite apenas os números'
              value={initialDate}
              onChange={event => setInitialDate(event.target.value)}
            />
             <button className="btn-g" type="submit">Cadastrar</button>
          </form>
        </div>
      </Modal>
      <header>
        <Toolbar />
      </header>

      <div className="statistics">
        <div className="input">
          <div className="flex-group">
            <strong>Entradas</strong>
            <FaRegArrowAltCircleUp size={30} color="#437F16" />
          </div>
          <h3>R$ {totalinput}</h3>
        </div>
        <div className="output">
          <div className="flex-group">
            <strong>Saídas</strong>
            <FaRegArrowAltCircleDown size={30} color="#E81123" />
          </div>
          <h3>R$ {totalexit}</h3>
        </div>
        <div className="balance">
          <div className="flex-group">
            <strong>Saldo</strong>
            <FaMoneyBillAlt size={30} color="#fff" />
          </div>
          <h3>R${balance}</h3>
        </div>
      </div>

      <div className="buttons-group">
        <div className="btns-content">
          <button onClick={() => setModalInput(!modalInput)}>Cadastrar</button>
        </div>
      </div>

      <div className="reports">
        <div className="table">
          <div className="table-head">
            <div className="description">
              <span>Descrição</span>
            </div>
            <div className="category">
              <span>Categoria</span>
            </div>
            <div className="date">
              <span>Data</span>
            </div>
            <div className="inputs">
              <span>Entrada</span>
            </div>
            <div className="inputs">
              <span>Saída</span>
            </div>
            <div className="inputs">
              <span>Saldo</span>
            </div>
          </div>
        </div>

        <div className="body-scroll">
          {/* <div className="table-body"> */}
          {registration && registration.map(item => (
            <div className="table-body" key={item.id}>
              <div className="description">
                <span>Descrição</span>
                <strong>{item.description}</strong>
              </div>
              <div className="category">
                <span>Categoria</span>
                <strong>{item.category}</strong>
              </div>
              <div className="date">
                <span>Data</span>
                <strong>{item.date}</strong>
              </div>
              <div className="inputs">
                <span>Entradas</span>
                <strong>R${item.input}</strong>
              </div>
              <div className="inputs">
                <span>Saídas</span>
                <strong>R${item.exit}</strong>
              </div>
              <div className="inputs">
                <span>Saldo</span>
                <strong>R${item.input - item.exit}</strong>
              </div>
            </div>
          ))}
        </div>
      {/* </div> */}
      </div>
    </div>
  );
}

export default Home;
