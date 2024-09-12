import { List } from 'immutable';

export function getListObject(array) {
    const immutableList = fromJS(array);

    return immutableList;
}

export function addElementToList(list, element) {
    list.push(element);

    return list;
}
