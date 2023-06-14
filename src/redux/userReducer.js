let initialState = {
    users: [],
    usersCount: 0,
    usersPageCount: 0,
}

export const userReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOAD_USER':
            const loadUser = state.users.filter((user) => user.id !== null && user.id > 0)
            loadUser.push(action.users)
            return {
                ...state,
                users: loadUser
            }
        case 'LOAD_USERS':
            let loadUsers = action.data.map(res => {
                return {
                    id: res.id,
                    login: res.login,
                    passwordHash: res.passwordHash,
                    name: res.name,
                    surname: res.surname,
                    patronymic: res.patronymic,
                    isAdmin: (res.isAdmin || "").toString(),
                }
            })

            return {
                ...state,
                users: loadUsers,
                usersCount: action.usersCount,
                usersPageCount: action.usersPageCount
            }
        case 'ADD_USER':
            const addUser = state.users.filter((user) => user.id !== action.user.id)
            addUser.push(action.user)
            return {
                ...state,
                users: addUser
            }

        case 'EDIT_USER':
            const editUser = state.users.filter((user) => user.id !== action.user.id)
            editUser.push(action.user)
            return {
                ...state,
                users: editUser
            };

        case 'DELETE_USER':
            const deleteUser = state.users.filter((user) => user.id !== null && user.id > 0)
            return {
                ...state,
                users: deleteUser
            }
        default:
            return state;
    }
}