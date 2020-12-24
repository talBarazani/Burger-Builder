import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://burger-app-fa1b3.firebaseio.com/'
})

export default instance