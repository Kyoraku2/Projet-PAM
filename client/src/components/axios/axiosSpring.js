import axios from 'axios';

// To contact the Spring API
export default axios.create({
  baseURL: 'http://localhost:8080'
});
