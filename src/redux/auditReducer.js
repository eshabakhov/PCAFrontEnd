let initialState = {
    audits: [],
    auditsCount: 0,
    auditsPageCount: 0,
}

export const auditReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOAD_AUDITS':
            let loadAudits = action.data.map(res => {
                return {
                    id: res.id,
                    username: res.username,
                    endpoint: res.endpoint,
                    method: res.method,
                    datetime: res.datetime,
                }
            })

            return {
                ...state,
                audits: loadAudits,
                auditsCount: action.auditsCount,
                auditsPageCount: action.auditsPageCount
            }
        default:
            return state;
    }
}