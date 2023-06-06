const initialState = {
    animalTypes: [],
    chippers: [],
    locations: []
}

export const othersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_ANIMAL_TYPES':
            const animalTypesNew = action.data.map(res => {
                return {
                    id: res.id,
                    type: res.type
                }
            })
            return {
                ...state,
                animalTypes: animalTypesNew
            }
        case 'LOAD_CHIPPERS':
            const chippers = action.data.map(res => {
                return {
                    id: res.id,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    role: res.role
                }
            })
            return {
                ...state,
                chippers: chippers
            }
        case 'LOAD_LOCATIONS':
            const locations = action.data.map(res => {
                return {
                    id: res.id,
                    latitude: res.latitude,
                    longitude: res.longitude,
                }
            })
            return {
                ...state,
                locations: locations
            }
        default:
            return state;
    }
}
