let initialState = {
    cities: [],
    citiesCount: 0,
    citiesPageCount: 0,
}

export const cityReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOAD_CITY':
            const loadCall = state.cities.filter((city) => city.id !== null && city.id > 0)
            loadCall.push(action.cities)
            return {
                ...state,
                cities: loadCall
            }
        case 'LOAD_CITIES':
            let loadCities = action.data.map(res => {
                return {
                    id: res.id,
                    nightRate: res.nightRate,
                    dayRate: res.dayRate,
                    name: res.name,
                    discountPercent: res.discountPercent,
                    discountCallMinutes: res.discountCallMinutes
                }
            })

            return {
                ...state,
                cities: loadCities,
                citiesCount: action.citiesCount,
                citiesPageCount: action.citiesPageCount
            }
        case 'ADD_CITY':
            const addCall = state.cities.filter((city) => city.id !== action.city.id)
            addCall.push(action.city)
            return {
                ...state,
                cities: addCall
            }

        case 'EDIT_CITY':
            const editCall = state.cities.filter((city) => city.id !== action.city.id)
            editCall.push(action.city)
            return {
                ...state,
                cities: editCall
            };

        case 'DELETE_CITY':
            const deleteCall = state.cities.filter((city) => city.id !== null && city.id > 0)
            return {
                ...state,
                cities: deleteCall
            }
        default:
            return state;
    }
}