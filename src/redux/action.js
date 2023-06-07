import store from "../index.js";

export function loadUsers(page = 0, orderBy = null, orderDir = null) {
    let size = 10
    if (page > 0) {
        page--;
    }
    return async dispatch => {
        let url = `/users/search?from=${page * size}&size=${size}`
        if (orderBy !== "" && orderDir !== "" && orderBy !== null && orderDir !== null) {
            url += `&orderby=${orderBy}&orderdir=${orderDir}`;
        }
        const response = await fetch(url);

        const jsonData = await response.json();
        dispatch({
            type: 'LOAD_USERS',
            data: jsonData.users,
            usersCount: jsonData.totalCount,
            usersPageCount: jsonData.pageCount,
        })
    }
}

export function addUser(animal) {
    let arrayAnimalTypes = [];
    arrayAnimalTypes.push(Number(animal.animalTypes))
    animal.animalTypes = arrayAnimalTypes
    animal.weight = Number(animal.weight)
    animal.length = Number(animal.length)
    animal.height = Number(animal.height)
    animal.chipperId = Number(animal.chipperId)
    animal.chippingLocationId = Number(animal.chippingLocationId)
    return async dispatch => {
        fetch('/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': store.token
            },
            body: JSON.stringify(animal)
        }).then(async response => {
            if (response.status === 401) {
                window.location.href = '/login';
                throw new Error('error');
            }
        })
            .then(res => res.json())
            .then(animal =>
                dispatch({
                    type: 'ADD_USER',
                    animal
                })).catch(() => {
        })
    }
}

export function editUser(animal) {
    let arrayAnimalTypes = [];
    arrayAnimalTypes.push(Number(animal.animalTypes))
    animal.animalTypes = arrayAnimalTypes
    animal.weight = Number(animal.weight)
    animal.length = Number(animal.length)
    animal.height = Number(animal.height)
    animal.chipperId = Number(animal.chipperId)
    animal.chippingLocationId = Number(animal.chippingLocationId)
    return async dispatch => {
        const response = await fetch(`/animals/${animal.id}`, {
            method: 'PUT',
            headers: {
                'Accetp': 'application/json',
                'Content-Type': 'application/json',
                'token': store.token
            },
            body: JSON.stringify(animal)
        })
        if (response.status === 401) {
            window.location.href = '/login';
            return
        }

        const jsonData = await response.json();
        dispatch({
            type: 'EDIT_ANIMAL',
            animal: jsonData
        })
    }
}

export function deleteUser(id) {
    return async dispatch => {
        fetch(`/animals/${id}`, {
            method: 'DELETE',
            headers: {
                'token': store.token
            }
        }).then(async response => {
            if (response.status === 401) {
                window.location.href = '/login';
                throw new Error('error');
            }
        }).then(() =>
            dispatch({
                type: 'DELETE_ANIMAL',
                id
            })).catch(() => {
        })
    }
}
