let initialState = {
    abonents: [],
    currentPage: 0,
    pageSize: 0,
    total: 0,
}

export const abonentReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOAD_ABONENT':
            const loadAbonent = state.abonents.filter((abonent) => abonent.id !== null && abonent.id > 0)
            loadAbonent.push(action.abonents)
            return {
                ...state,
                abonents: loadAbonent
            }
        case 'LOAD_ABONENTS':
            let loadAbonents = action.data.list.map(res => {
                return {
                    inn: res.inn,
                    phoneNumber: res.phoneNumber,
                    address: res.address,
                    name: res.name,
                }
            })

            return {
                ...state,
                abonents: loadAbonents,
                currentPage: action.data.currentPage,
                pageSize: action.data.pageSize,
                total: action.data.total,
            }
        case 'ADD_ABONENT':
            const addAbonent = state.abonents.filter((abonent) => abonent.id !== action.abonent.id)
            addAbonent.push(action.abonent)
            return {
                ...state,
                abonents: addAbonent
            }

        case 'EDIT_ABONENT':
            const editAbonent = state.abonents.filter((abonent) => abonent.id !== action.abonent.id)
            editAbonent.push(action.abonent)
            return {
                ...state,
                abonents: editAbonent
            };

        case 'DELETE_ABONENT':
            const deleteAbonent = state.abonents.filter((abonent) => abonent.id !== null && abonent.id > 0)
            return {
                ...state,
                abonents: deleteAbonent
            }
        default:
            return state;
    }
}