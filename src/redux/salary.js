import * as ActionTypes from './ActionTypes'

export const Salary = (state = {
    isLoading: true,
    salary: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SALARY:
            return { state, isLoading: true, salary: action.payload };
        default:
            return state;
    }
}

