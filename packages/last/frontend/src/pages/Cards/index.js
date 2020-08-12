import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

export default function Cards(){
    const userToken = localStorage.getItem('userToken'),
        user = localStorage.getItem('user'),
        [listItens, setListItens] = useState([]),
        history = useHistory();


    if(!userToken)
        history.push('/entrar');

    useEffect(()=>{
        api.get('card',
        {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        }).then(response => {
            setListItens(response.data);
        });

    }, [userToken]);

    function hasSelected(card){
        console.log(card);
    }

    function cardList(card){
        return (
            <li className="row" key={card._id} onClick={() => hasSelected(card)}>
                    <div className="grid-8">{new Date(card.date).toLocaleDateString("pt-BR")}</div>
                    <div className="grid-4">total</div>
                    <div className="grid-6">{card.tipe}</div>
                    <div className="grid-6">{card.amount} animais</div>
            </li> 
        )
    };

    return (
        <>
            <Header />

            <section className="container">
                <div className="grid-4">
                    <div className="headerListCards row">
                        <h1>Fichas</h1>
                    </div>
                    <div className="listCards">
                        <ul className="row">
                            {listItens.map(card => cardList(card)) }
                        </ul>
                    </div>
                </div>
                <div className="grid-8">
                    <div className="headerButtons row">
                        <h1>.</h1>
                    </div>
                    <div className="cardData row">

                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}