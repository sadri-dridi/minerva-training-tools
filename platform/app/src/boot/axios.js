import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-approtools.herokuapp.com/v1'
    : 'http://localhost:3333/v1'
   

