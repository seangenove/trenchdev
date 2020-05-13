import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

export const register = ({ name, email, password }) => async dispatch => {
    await axios.post('/api/users', { name, email, password })
        .then(({ data }) => {

            dispatch({
                type: REGISTER_SUCCESS,
                payload: data
            });

        }).catch((error) => {
            dispatch({
                type: REGISTER_FAIL,
            });
            
            const errors = error.response.data.errors;

            if (errors) {
                console.log('pasok dito');
                errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            }

            if (error.response) {
                console.log('Errors', error.response.data.errors);
            }
        });
}