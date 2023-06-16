let pageSize = 10

export function loadUsers(page = 0, orderBy = null, orderDir = null) {
    let size = 10
    if (page > 0) {
        page--;
    }
    return async dispatch => {
        let url = `/users/list?page=${page * size}&pageSize=${size}`
        if (orderBy !== "" && orderDir !== "" && orderBy !== null && orderDir !== null) {
            url += `&orderby=${orderBy}&orderdir=${orderDir}`;
        }
        const response = await fetch(url);
        const jsonData = await response.json();
        dispatch({
            type: 'LOAD_USERS',
            data: jsonData,
        })
    }
}

export function addUser(user) {
    return async dispatch => {
        fetch('/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(async response => response.json())
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
        const response = await fetch(`/users`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
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


export function loadAbonents(page = 1, orderBy = null, orderDir = null) {
    return async dispatch => {
        let url = `/abonents/list?page=${page}&pageSize=${pageSize}`
        if (orderBy !== "" && orderDir !== "" && orderBy !== null && orderDir !== null) {
            url += `&orderby=${orderBy}&orderdir=${orderDir}`;
        }
        const response = await fetch(url);
        const jsonData = await response.json();
        dispatch({
            type: 'LOAD_ABONENTS',
            data: jsonData,
        })
    }
}

export function addAbonent(abonent) {
    return async dispatch => {
        fetch('/abonents', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(abonent)
        }).then(async response => response.json())
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
        const response = await fetch(`/abonents`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(abonent)
        })
        const jsonData = await response.json();
        dispatch({
            type: 'EDIT_ABONENT',
            abonent: jsonData
        })
    }
}

export function deleteAbonent(id) {
    return async dispatch => {
        fetch(`/abonents/${id}`, {
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


export function loadCalls(page = 0, orderBy = null, orderDir = null) {
    let size = 10
    if (page > 0) {
        page--;
    }
    return async dispatch => {
        let url = `/calls/list?page=${page * size}&pageSize=${size}`
        if (orderBy !== "" && orderDir !== "" && orderBy !== null && orderDir !== null) {
            url += `&orderby=${orderBy}&orderdir=${orderDir}`;
        }
        const response = await fetch(url);
        const jsonData = await response.json();
        dispatch({
            type: 'LOAD_CALLS',
            data: jsonData,
        })
    }
}

export function addCall(user) {
    return async dispatch => {
        fetch('/calls', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(async response => response.json())
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
        const response = await fetch(`/calls`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const jsonData = await response.json();
        dispatch({
            type: 'EDIT_CALL',
            user: jsonData
        })
    }
}

export function deleteCall(id) {
    return async dispatch => {
        fetch(`/calls/${id}`, {
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

export function loadCities(page = 1, orderBy = null, orderDir = null) {
    return async dispatch => {
        let url = `/cities/list?page=${page}&pageSize=${pageSize}`
        if (orderBy !== "" && orderDir !== "" && orderBy !== null && orderDir !== null) {
            url += `&orderby=${orderBy}&orderdir=${orderDir}`;
        }
        const response = await fetch(url);
        const jsonData = await response.json();
        dispatch({
            type: 'LOAD_CITIES',
            data: jsonData,
        })
    }
}

export function addCity(city) {
    return async dispatch => {
        fetch('/cities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(city)
        }).then(async response => response.json())
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
        const response = await fetch(`/cities`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(city)
        })
        const jsonData = await response.json();
        dispatch({
            type: 'EDIT_CITY',
            city: jsonData
        })
    }
}

export function deleteCity(id) {
    return async dispatch => {
        fetch(`/cities/${id}`, {
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

export function loadAudits(page = 1, orderBy = null, orderDir = null) {
    return async dispatch => {
        let url = `/audit/list?page=${page}&pageSize=${pageSize}`
        if (orderBy !== "" && orderDir !== "" && orderBy !== null && orderDir !== null) {
            url += `&orderby=${orderBy}&orderdir=${orderDir}`;
        }
        const response = await fetch(url);
        const jsonData = await response.json();
        dispatch({
            type: 'LOAD_AUDITS',
            data: jsonData,
        })
    }
}