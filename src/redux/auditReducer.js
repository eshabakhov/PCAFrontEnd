let initialState = {
    audits: [],
    currentPage: 0,
    pageSize: 0,
    total: 0,
}

export const auditReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOAD_AUDITS':
            let loadAudits = action.data.list.map(res => {
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
                currentPage: action.data.currentPage,
                pageSize: action.data.pageSize,
                total: action.data.total
            }
        default:
            return state;
    }
}