import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERTS } from './types.js';

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();

    dispatch({ type: SET_ALERT, payload: { id, msg, alertType } });

    if (alertType === 'success') {
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERTS });
        }, 5000);
    }
}

export const removeAlerts = () => dispatch => {
    dispatch({ type: REMOVE_ALERTS });
}