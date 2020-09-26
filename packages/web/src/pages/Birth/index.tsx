import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

export default function Home(){
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
            <Container>
                Nascidos - {userToken}<br/>
                {user}
            </Container>
        </>
    )
}