import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utilities/setAuthToken';

import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    await axios.get('/api/auth')
        .then(({ data }) => {

            dispatch({
                type: USER_LOADED,
                payload: data
            });

        }).catch((error) => {
            dispatch({
                type: AUTH_ERROR,
            });

            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            }

            if (error.response) {
                console.log('Errors', error.response.data);
            }
        });
}

export const register = (name, email, password) => async dispatch => {
    await axios.post('/api/users', { name, email, password })
        .then(({ data }) => {

            dispatch({
                type: REGISTER_SUCCESS,
                payload: data
            });

            dispatch(loadUser());

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

// Login user
export const login = (email, password) => async dispatch => {
    await axios.post('/api/auth', { email, password })
        .then(({ data }) => {

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });

            dispatch(loadUser());

        }).catch((error) => {
            dispatch({
                type: LOGIN_FAIL,
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

// Logout
export const logout = () => dispatch => {
    console.log('boomz');
    dispatch({ type: LOGOUT });
}