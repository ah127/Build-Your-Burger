import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-app-8a567.firebaseio.com/'
});

export default instance;