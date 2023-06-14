let initialState = {
    calls: [],
    callsCount: 0,
    callsPageCount: 0,
}

export const callReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOAD_CALL':
            const loadCall = state.calls.filter((call) => call.id !== null && call.id > 0)
            loadCall.push(action.calls)
            return {
                ...state,
                calls: loadCall
            }
        case 'LOAD_CALLS':
            let loadCalls = action.data.map(res => {
                return {
                    id: res.id,
                    abonentName: res.abonentName,
                    cityName: res.cityName,
                    date: res.date,
                    time: res.time,
                    minutes: res.minutes,
                }
            })

            return {
                ...state,
                calls: loadCalls,
                callsCount: action.callsCount,
                callsPageCount: action.callsPageCount
            }
        case 'ADD_CALL':
            const addCall = state.calls.filter((call) => call.id !== action.call.id)
            addCall.push(action.call)
            return {
                ...state,
                calls: addCall
            }

        case 'EDIT_CALL':
            const editCall = state.calls.filter((call) => call.id !== action.call.id)
            editCall.push(action.call)
            return {
                ...state,
                calls: editCall
            };

        case 'DELETE_CALL':
            const deleteCall = state.calls.filter((call) => call.id !== null && call.id > 0)
            return {
                ...state,
                calls: deleteCall
            }
        default:
            return state;
    }
}