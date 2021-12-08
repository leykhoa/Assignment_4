import * as ActionTypes from './ActionTypes';

export const Departments = (state = {
    isLoading: true,
    departments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPARTMENTS:
            return { ...state, isLoading: false, departments: action.payload }
        default:
            return state;
    }
}