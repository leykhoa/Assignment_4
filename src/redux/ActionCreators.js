import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



//================LOADING DATA======================//
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));
    return fetch(baseUrl + 'staffs')
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            (error) => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response) => response.json())
        .then((staffs) => dispatch(addStaffs(staffs)))
        .catch((error) => dispatch(staffsFailed(error.message)));
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

//===============ADD NEW STAFF==============//
export const addNewStaff = (
    staffID,
    fullName,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime,
    image) => (dispatch) => {
        const newStaff = {
            id: staffID,
            name: fullName,
            doB: doB,
            startDate: startDate,
            departmentId: departmentId,
            salaryScale: salaryScale,
            annualLeave: annualLeave,
            overTime: overTime,
            image: image,
        };
        return fetch(baseUrl + "staffs", {
            method: "POST",
            body: JSON.stringify(newStaff),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then((response) => response.json())
            .then((response) => dispatch(addStaff(response)))
            .catch((error) => {
                console.log("add Staff", error.message);
                alert("Cannot add Staff by Error: " + error.message);
            });
    };

export const addStaff = (newStaff) => ({
    type: ActionTypes.ADD_NEWSTAFF,
    payload: newStaff,
});

//===============UPDATE STAFF===============//
export const updateStaff = (
    staffID,
    fullName,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime,
    image
) => {
    return (dispatch) => {
        const staff = {
            id: staffID,
            name: fullName,
            doB: doB,
            startDate: startDate,
            departmentId: departmentId,
            salaryScale: salaryScale,
            annualLeave: annualLeave,
            overTime: overTime,
            image: image
        };

        return fetch(baseUrl + "staffs", {
            method: "PATCH",
            body: JSON.stringify(staff),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        })
            .then(
                (response) => {
                    if (response.ok) {
                        return response
                    } else {
                        var error = new Error(
                            "Error " + response.status + ": " + response.statusText
                        );
                        error.response = response;
                        throw error;
                    }
                },
                (error) => {
                    throw error;
                }
            )
            .then((response) => response.json())
            .then((response) => dispatch(upStaff(response)))
            .catch((error) => {
                console.log("update staff", error.message);
                alert("Error: " + error.message);
            });
    };
};

export const upStaff = (staff) => ({
    type: ActionTypes.UPDATE_STAFF,
    payload: staff,
});

//================DELETE STAFF====================//
export const deleteStaff = (id) => async (dispatch) => {
    const staffId = {
        id: id
    }
    return fetch(baseUrl + "staffs/" + id, {
        method: "DELETE",
        body: JSON.stringify(staffId),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then((response) => dispatch(delStaff(response)))
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

export const delStaff = (staffs) => ({
    type: ActionTypes.DELETE_STAFF,
    payload: { staffs }
})


//================DEPARTMENT========================//
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading());
    return fetch(baseUrl + 'departments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
}

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});


//================SALARY========================//

export const fetchSalary = () => (dispatch) => {
    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(salary => dispatch(addSalary(salary)))
        .catch(error => dispatch(salaryFailed(error.message)));
}

export const addSalary = (salary) => ({
    type: ActionTypes.ADD_SALARY,
    payload: salary
});

export const salaryFailed = (errmess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errmess
});

