import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server-moderavaca.mh4sh.dev'
});

export default api;