
import { SET_ALERT, REMOVE_ALERTS } from './../actions/types.js';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload]
        case REMOVE_ALERTS:
            return [];
        default:
            return state;
    }
}
