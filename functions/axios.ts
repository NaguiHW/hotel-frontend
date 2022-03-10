import axios from "axios";

const environment = process.env.NODE_ENV || 'development';

const instance = axios.create({
  baseURL: environment === 'development' ? 'http://localhost:5000' : '',
});

export default instance;
