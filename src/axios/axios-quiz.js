import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-app-e12a9.firebaseio.com/'
})