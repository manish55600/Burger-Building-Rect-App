import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react--my-burger-cac29-default-rtdb.firebaseio.com/'
})

export default instance