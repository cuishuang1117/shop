import axios from 'axios'

const product = (data) => ({type: 'GET_ITEMS', data})

export default function productAsync () {
    return (dispatch) => {
        axios.get('/api/admin/products').then(
            response => { dispatch(product(response.data.items)) },
            err => {console.log(err)}
        )
    }
}