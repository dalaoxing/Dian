import Axios from 'axios';

//登陆
export const Login = (obj) => Axios.post('/api/user/login', obj);

//注册
export const Register = (obj) => Axios.post('/api/user/registry', obj);

//banner
export const Banner = () => Axios.get('/api/home/banner');

//首页数据
export const homeList = (params) => Axios.get('/api/home/shop', { params });

//分类数据
export const Classfiy = () => Axios.get('/api/shop/shopType');