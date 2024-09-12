
export default function getListObject(array) {
    const immutableList = fromJS(array);

    return immutableList;
}

export default function addElementToList(list, element) {
    list.push(element);

    return list;
}