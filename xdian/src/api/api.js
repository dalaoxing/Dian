import Axios from 'axios';

export const Login = (obj) => Axios.post('/api/user/login', obj);