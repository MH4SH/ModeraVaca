import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

export default function Cards(){
    const userToken = localStorage.getItem('userToken'),
        user = localStorage.getItem('user'),
        history = useHistory();


    if(!userToken)
        history.push('/entrar');

    useEffect(()=>{
        console.log(userToken);
    }, [userToken])

    return (
        <>
            <Header />

            <section className="container">
                <div className="grid-4">
                    Menu
                </div>
                <div className="grid-8">
                    Content
                </div>
            </section>


            <Footer />
        </>
    )
}