import store from "./index.js";

export const submit = (event, aFunction, entity) => {
    event.preventDefault();
    aFunction(entity);
}

export const change = (event, setFunction, entity) => {
    const {name, value} = event.target;
    setFunction({...entity, [name]: value});
}

export const getEntity = (entity, id, setFunction) => {
    return fetch(`/api/${entity}/${id}`)
        .then(async response => {
            let jsonData = await response.json()
            setFunction(jsonData)
        });
}

export const sortLogic = (a, b, sorting) => {
    return a[sorting.field] > b[sorting.field] && sorting.increase ? 1 : -1;
}