import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERTS } from './types.js';

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();

    dispatch(
        {
            type: SET_ALERT,
            payload: { id, msg, alertType }
        }
    );

    console.log('done');
}

export const removeAlerts = () => dispatch => {
    console.log('pasoooook');
    dispatch(
        {
            type: REMOVE_ALERTS
        }
    );
}