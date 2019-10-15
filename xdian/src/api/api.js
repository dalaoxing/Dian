import Axios from '@/until/http';

//登陆
export const Login = (obj) => Axios.post('/api/user/login', obj);

//注册
export const Register = (obj) => Axios.post('/api/user/registry', obj);

//请求用户信息
export const getUserInfo = () => Axios.get('/api/user/getUserInfo');

//banner
export const Banner = () => Axios.get('/api/home/banner');

//首页数据
export const homeList = (params) => Axios.get('/api/home/shop', { params });

//分类数据
export const Classfiy = () => Axios.get('/api/shop/shopType');

//分类筛选数据
export const ClassSelect = (params) => Axios.get('/api/shop/selectType', { params });

//添加购物车
export const addCar = (obj) => Axios.post('/api/car/addCar', obj);

//获取购物车
export const getCar = (params) => Axios.get('/api/car/getCar', { params });

//删除购物车数量
export const removeCar = (obj) => Axios.post('/api/car/removeCar', obj);

//删除购物车商品
export const removeShop = (obj) => Axios.post('/api/car/removeShop', obj);