import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    // ? 'https://api.meuhomeschool.com.br/v1'
    ? 'https://api.widjet.info/v1'
    : 'http://localhost:3333/v1'
   

