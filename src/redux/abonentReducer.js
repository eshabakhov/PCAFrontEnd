let initialState = {
    abonents: [],
    abonentsCount: 0,
    abonentsPageCount: 0,
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
            let loadAbonents = action.data.map(res => {
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
                abonentsCount: action.abonentsCount,
                abonentsPageCount: action.abonentsPageCount
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