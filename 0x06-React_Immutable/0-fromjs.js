import { fromJS } from "./node_modules/immutable/dist/immutable";

function getImmutableObject(object){
    return fromJS(object);
}
module.exports = getImmutableObject;
