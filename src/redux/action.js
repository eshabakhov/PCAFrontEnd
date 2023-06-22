import {Cookies} from "react-cookie";

let pageSize = 10

const cookies = new Cookies();

export function loadUsers(page = 1) {
    return async dispatch => {
        let url = `/api/users/list?page=${page}&pageSize=${pageSize}`
        const response = await fetch(url);
        if (response.status === 401) {
            window.location.href = "/login"
        } else if (response.status !== 403) {
            const jsonData = await response.json();
            dispatch({
                type: 'LOAD_USERS',
                data: jsonData,
            })
        }
    }
}

export function addUser(user) {
    return async dispatch => {
        return fetch('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(async response => {
                if (response.status === 400) {
                    alert(await response.text());
                    return false;
                }
                const jsonData = response.json();
            }
        )
            .then(user =>
                dispatch({
                    type: 'ADD_USER',
                    user
                })).catch(() => {
        })
    }
}

export function editUser(user) {
    console.log(user)
    return async dispatch => {
        const response = await fetch(`/api/users`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        if (response.status === 400) {
            alert(await response.text());
            return false;
        }
        const jsonData = await response.json();
        dispatch({
            type: 'EDIT_USER',
            user: jsonData
        })
    }
}

export function deleteUser(id) {
    return async dispatch => {
        fetch(`/users/${id}`, {
            method: 'DELETE',
        }).then(async response => response.json())
            .then(() =>
                dispatch({
                    type: 'DELETE_USER',
                    id
                })).catch(() => {
        })
    }
}


export function loadAbonents(page = 1) {
    return async dispatch => {
        let url = `/api/abonents/list?page=${page}&pageSize=${pageSize}`
        const response = await fetch(url);
        if (response.status === 401) {
            window.location.href = "/login"
        } else if (response.status !== 403) {
            const jsonData = await response.json();
            dispatch({
                type: 'LOAD_ABONENTS',
                data: jsonData,
            })
        }
    }
}

export function addAbonent(abonent) {
    return async dispatch => {
        return fetch('/api/abonents', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(abonent)
        }).then(async response => {
                if (response.status === 400) {
                    alert(await response.text());
                    return false;
                }
                const jsonData = response.json();
            }
        )
            .then(abonent =>
                dispatch({
                    type: 'ADD_ABONENT',
                    abonent
                })).catch(() => {
        })
    }
}


export function editAbonent(abonent) {
    console.log(abonent)
    return async dispatch => {
        const response = await fetch(`/api/abonents`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(abonent)
        })
        if (response.status === 400) {
            alert(await response.text());
            return false;
        }
        const jsonData = response.json();
        dispatch({
            type: 'EDIT_ABONENT',
            abonent: jsonData
        })
    }
}

export function deleteAbonent(id) {
    return async dispatch => {
        fetch(`/api/abonents/${id}`, {
            method: 'DELETE',
        }).then(async response => response.json())
            .then(() =>
                dispatch({
                    type: 'DELETE_ABONENT',
                    id
                })).catch(() => {
        })
    }
}

export function loadCalls(page = 1) {
    return async dispatch => {
        let url = `/api/calls/list?page=${page}&pageSize=${pageSize}`
        const response = await fetch(url);
        if (response.status === 401) {
            window.location.href = "/login"
        } else if (response.status !== 403) {
            const jsonData = await response.json();
            dispatch({
                type: 'LOAD_CALLS',
                data: jsonData,
            })
        }
    }
}

export function addCall(user) {
    return async dispatch => {
        return fetch('/api/calls', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(async response => {
                if (response.status === 400) {
                    alert(await response.text());
                    return false;
                }
                const jsonData = response.json();
            }
        )
            .then(user =>
                dispatch({
                    type: 'ADD_CALL',
                    user
                })).catch(() => {
        })
    }
}

export function editCall(user) {
    console.log(user)
    return async dispatch => {
        const response = await fetch(`/api/calls`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        if (response.status === 400) {
            alert(await response.text());
            return false;
        }
        const jsonData = await response.json();
        dispatch({
            type: 'EDIT_CALL',
            user: jsonData
        })
    }
}

export function deleteCall(id) {
    return async dispatch => {
        fetch(`/api/calls/${id}`, {
            method: 'DELETE',
        }).then(async response => response.json())
            .then(() =>
                dispatch({
                    type: 'DELETE_CALL',
                    id
                })).catch(() => {
        })
    }
}

export function loadCities(page = 1) {
    return async dispatch => {
        let url = `/api/cities/list?page=${page}&pageSize=${pageSize}`
        const response = await fetch(url);
        if (response.status === 401) {
            window.location.href = "/login"
        } else if (response.status !== 403) {
            const jsonData = await response.json();
            dispatch({
                type: 'LOAD_CITIES',
                data: jsonData,
            })
        }
    }
}

export function addCity(city) {
    return async dispatch => {
        return fetch('/api/cities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(city)
        }).then(async response => {
                if (response.status === 400) {
                    alert(await response.text());
                    return false;
                }
                const jsonData = response.json();
            }
        )
            .then(city =>
                dispatch({
                    type: 'ADD_CITY',
                    city
                })).catch(() => {
        })
    }
}

export function editCity(city) {
    console.log(city)
    return async dispatch => {
        const response = await fetch(`/api/cities`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(city)
        })
        if (response.status === 400) {
            alert(await response.text());
            return false;
        }
        const jsonData = await response.json();
        dispatch({
            type: 'EDIT_CITY',
            city: jsonData
        })
    }
}

export function deleteCity(id) {
    return async dispatch => {
        fetch(`/api/cities/${id}`, {
            method: 'DELETE',
        }).then(async response => response.json())
            .then(() =>
                dispatch({
                    type: 'DELETE_CITY',
                    id
                })).catch(() => {
        })
    }
}

export function loadAudits(page = 1) {
    return async dispatch => {
        let url = `/api/audit/list?page=${page}&pageSize=${pageSize}`
        const response = await fetch(url);
        const jsonData = await response.json();
        dispatch({
            type: 'LOAD_AUDITS',
            data: jsonData,
        })
    }
}

export function context() {
    return async dispatch => {
        const response = await fetch('/api/context', {
            method: 'GET'
        });
        const jsonData = await response.json();
        cookies.set('isAdmin', jsonData.isAdmin, {path: '/'});

        // dispatch({
        //     type: 'LOAD_CONTEXT',
        //     is_admin: jsonData.isAdmin
        // })
    }
}

export function logout() {
    return async dispatch => {
        fetch('/api/logout').then(res => {
            const cookies = new Cookies();
            cookies.remove('iAdmin');
            dispatch({
                type: 'LOGOUT'
            })
        });
    }
}
